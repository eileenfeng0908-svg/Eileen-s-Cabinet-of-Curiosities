# Usage: python3 scripts/watercolour.py photo.jpg out.jpg [colours=6] [bold]
# `bold` thickens thin light lines so they survive at drawer size.
# Makes the drawer version of a Curator's Cabinet photo (see `painted` in content/curation.ts). Needs Pillow, numpy, scipy.
# Simple watercolour rendition of a photo: flattened washes, wobbly edges,
# pooled pigment at the edges of each wash, granulation and paper showing through.
from PIL import Image, ImageFilter
import numpy as np, sys
from scipy import ndimage as nd
src,dst=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB')
W=900; im=im.resize((W,int(W*im.size[1]/im.size[0])),Image.LANCZOS)
if 'bold' in sys.argv[4:]:
    # thicken light lines and dark lettering alike, so both read at small sizes
    lo=np.array(im.filter(ImageFilter.MinFilter(5))); hi=np.array(im.filter(ImageFilter.MaxFilter(7)))
    im=Image.fromarray(np.where((lo.max(-1)<70)[...,None],lo,hi))
a=np.array(im).astype(float); h,w=a.shape[:2]
rng=np.random.default_rng(4)
def noise(s):
    n=rng.random((h//s+2,w//s+2)); return np.array(Image.fromarray((n*255).astype('uint8')).resize((w,h),Image.BICUBIC)).astype(float)/255-0.5
# 1. wobble: displace pixels with low-frequency noise (hand-painted edges)
dy=noise(40)*9+noise(12)*1.2; dx=noise(40)*9+noise(12)*1.2
yy,xx=np.mgrid[0:h,0:w]
a=np.stack([nd.map_coordinates(a[...,c],[yy+dy,xx+dx],order=1,mode='nearest') for c in range(3)],-1)
# 2. flatten into washes: smooth while keeping edges (mean shift-ish via repeated median)
img=Image.fromarray(a.clip(0,255).astype('uint8'))
for _ in range(2): img=img.filter(ImageFilter.MedianFilter(5))
a=np.array(img).astype(float)
q=np.array(img.quantize(colors=int(sys.argv[3]) if len(sys.argv)>3 else 6, method=Image.Quantize.MEDIANCUT,kmeans=2).convert('RGB')).astype(float)
a=q*0.75+a*0.25
# 3. pigment lightens like watercolour on paper (transparent), mixes toward paper
paper=np.array([246,236,214.])
a=paper-(paper-a)*0.86
# 4. edge darkening where washes meet (pooled pigment)
lum=a.mean(-1); g=nd.gaussian_gradient_magnitude(lum,1.6); g=np.clip(g/25,0,1)
a=a*(1-g[...,None]*0.18)
# 5. blooms and granulation
bloom=noise(110)*0.9+noise(45)*0.5; gran=noise(3)*0.5+noise(2)*0.4
dark=1-lum/255
a=paper-(paper-a)*(1+bloom[...,None]*0.28+gran[...,None]*0.14*dark[...,None])
# 6. paper tooth
tooth=noise(2)*0.04+noise(6)*0.03
a=a*(1+tooth[...,None])
# 7. ragged painted edge: paper shows where the wash stops short
edge=np.minimum.reduce([xx,yy,w-1-xx,h-1-yy]).astype(float)
cut=edge<9+(noise(30)+noise(9)*0.25)*16
soft=nd.gaussian_filter((~cut).astype(float),1.5)
a=a*soft[...,None]+paper*(1-soft[...,None])
rim=nd.gaussian_filter(np.abs(np.gradient(soft)[0])+np.abs(np.gradient(soft)[1]),1.2)
a=a*(1-np.clip(rim*3,0,0.25)[...,None])
Image.fromarray(a.clip(0,255).astype('uint8')).save(dst,quality=88); print(w,h)
