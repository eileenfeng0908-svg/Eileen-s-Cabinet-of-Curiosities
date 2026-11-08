import type { Article } from "@/lib/types";

/** Her essay on #MeToo and trial by media (English only, at her request), added 2026-11-08. */
export const hashtagMantra: Article = {
  slug: "sense-and-sensibility-hashtag-mantra",
  title: "Sense and Sensibility: Hashtag Mantra That Stifles Innocence In the Digital Age",
  dek: "A social critique of hashtag activism and “trial by media”, written in support of #MeToo.",
  category: "Essays",
  cover: {
    src: "/images/writing/hashtag-mantra/cover.jpg",
    alt: "Book cover of Guilt by Accusation: The Challenge of Proving Innocence in the Age of #MeToo by Alan Dershowitz, red and white lettering on black",
    aspect: 1000 / 1495,
    caption: "Alan Dershowitz, Guilt by Accusation: The Challenge of Proving Innocence in the Age of #MeToo",
  },
  body: [
    { type: "paragraph", text: "In an era dominated by social media, countless tweets, hashtags, and short videos pop up when we think of voicing opinions. While people have gained new ways to protest, behind the hashtags lies the erasure of certain individuals’ innocence." },
    { type: "quote", text: "“We will not be silent. We will not be afraid.”" },
    { type: "paragraph", text: "Throughout the feminist movement’s history, women have advocated for their rights through offline marches, public gatherings, and speeches. In the digital age, feminist activism has merged with social media, allowing women to share their experiences with inequality and violence online, changing from Take Back the Night to Take Back the Right." },
    { type: "paragraph", text: "In the fall of 2017, allegations against Harvey Weinstein rang the powerful #MeToo alarm bell to the world. Women who had experienced sexual harassment and violence commented and retweeted under Alyssa Milano’s #MeToo tweets, using the internet to share their pain. #MeToo, founded by Tarana Burke in 2006, developed into a protest against the patriarchal system in the digital age via hashtags. However, despite #MeToo’s advancement towards social change and encouragement for women to speak out and raise awareness of sexual violence, there are legitimate concerns regarding false accusations. While the activism undeniably supported the survivors, it inadvertently led to a ‘trial by media’ for the accused. False accusations target innocents who have never met their accusers, while many journalists are unwilling to report their inculpability." },
    { type: "paragraph", text: "Alan Dershowitz, the legendary lawyer from Harvard Law School, was accused of underage sex with Virginia Giuffre—a victim of Epstein’s island, whom he had never met before. In his book, *Guilt by Accusation: The Challenge of Proving Innocence in the Age of #MeToo*, he exposes the bias and inequality that exist within the digital age and the dangers of #MeToo culture:" },
    { type: "quote", text: "“If the mantra that all women always tell the truth and that all women should always be believed were to become widely accepted, it would simply substitute one form of sexism for another.”", source: "Dershowitz 94" },
    { type: "paragraph", text: "Although the accusation against Dershowitz predated the #MeToo movement, his innocence was overshadowed and ignored as the movement evolved. His case leads to the question: Under the feminist wave spearheaded by #MeToo, have we become too devoted to our beliefs, leading to the rise of another form of gender discrimination? If all victims should speak out, then it must not be simply the majority but also the minority. Dershowitz mentions how the media broadcasted his false accusations but refused to publicise his innocence, even though he had proven his innocence through multiple investigations. Meanwhile, the media rejected stories from male innocents, as in the #MeToo era, men are often seen as perpetrators." },
    { type: "paragraph", text: "The media bias is an unintended consequence of the immense influence of #MeToo. Justice is sometimes compromised under the weight of hashtags, and the uneraseable “guilt” of innocents remains in their words. #MeToo should not be hijacked by sexism. While hashtags can amplify voices and empower everyone to share their stories, the mantra of hashtags should always promote equality and fairness for all." },
  ],
  bibliography: ["Dershowitz, Alan M. *Guilt by Accusation.* Simon and Schuster, 19 Nov. 2019, p. 94."],
};
