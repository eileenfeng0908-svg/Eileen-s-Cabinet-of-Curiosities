import type { Article } from "@/lib/types";
import { misconceptionsOnScreen } from "./papers/misconceptions-on-screen";
import { whatIsSelfDeceit } from "./papers/what-is-self-deceit";

/**
 * WRITING
 * One object per article. The URL is /writing/<slug>.
 * Reading time is calculated automatically from the body.
 * Titles and text below are placeholders to replace.
 */
export const articles: Article[] = [
  // Eileen's film midterm, Spring 2026. Text as she wrote it; images laid out as in her PDF.
  {
    "slug": "continuity-and-transformation-peter-weir",
    "title": "Continuity and Transformation: The Evolution of Peter Weir’s Directorial Vision in The Truman Show and Dead Poets Society",
    "dek": "This essay argues that The Truman Show represents both continuity and change in how Peter Weir expresses his directorial vision.",
    "category": "Film Criticism",
    "cover": {
      "src": "/images/writing/peter-weir/cover-classroom.webp",
      "alt": "John Keating stands on his desk in front of his students",
      "caption": "Dead Poets Society (dir. Peter Weir, 1989) © Touchstone Pictures.",
      "aspect": 1.7789
    },
    "hideCover": true,
    "body": [
      {
        "type": "paragraph",
        "text": "Peter Weir, the acclaimed Australian director, is known for films that place individuals within highly controlled social worlds and trace their attempts to break free from them. Dead Poets Society (1989) and The Truman Show (1998), though very different in setting and tone, both films centre on characters who awaken to the limitations of the systems surrounding them. In Dead Poets Society, this conflict emerges within the rigid traditions of an elite boys’ school, the Welton Academy, while in The Truman Show, it is transformed into a satirical, media-driven struggle between personal freedom and manufactured reality. This essay argues that The Truman Show represents both continuity and change in how Peter Weir expresses his directorial vision: while it continues his longstanding exploration of themes such as conformity, individuality, and self-realisation, it introduces significant shifts in visual style, narrative method, and industrial context."
      },
      {
        "type": "paragraph",
        "text": "In both The Truman Show and Dead Poets Society, Weir utilises the contrast between warm and cool colour palettes as a means of articulating the emotional interiority of his characters. Yet while The Truman Show is suffused with warm tones that construct an illusion of comfort and stability, Dead Poets Society is marked by a cooler visual palette that reinforces the film’s underlying atmosphere of melancholy and emotional constraint."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/colour-palettes.webp",
          "alt": "Stills from The Truman Show (left) and Dead Poets Society (right), each set beside its colour palette",
          "caption": "Left: The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures. Right: Dead Poets Society (dir. Peter Weir, 1989) © Touchstone Pictures.",
          "aspect": 1.2358
        }
      },
      {
        "type": "paragraph",
        "text": "In terms of the cinematography of the two films. The cinematography of The Truman Show is closely aligned with its premise as a constructed reality show, incorporating camera-like movements such as frequent zooms and tracking shots that mimic the logic of live broadcast and surveillance. The camera often adopts positions that resemble hidden or observational viewpoints, reinforcing the idea that Truman’s life is constantly being recorded and controlled by the director—Christof. In contrast, Dead Poets Society employs a more intimate and character-focused cinematographic style. The film relies heavily on close-ups and mid-shots to capture subtle emotional nuances and reactions, drawing the audience into the internal experiences of the characters."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/truman-camera.webp",
          "alt": "Truman framed through screens and observing, camera-like viewpoints",
          "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 1.3424
        }
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/dps-close-ups.webp",
          "alt": "Close-ups and mid-shots of John Keating and his students",
          "caption": "Dead Poets Society (dir. Peter Weir, 1989) © Touchstone Pictures.",
          "aspect": 1.2299
        }
      },
      {
        "type": "paragraph",
        "text": "At the same time, both films make use of close-ups and occasional extreme close-ups to emphasise significant details and symbolic objects. In Dead Poets Society, close-ups of props such as books, photographs, and Neil’s crown serve to highlight themes of individuality, and aspiration. Similarly, in The Truman Show, the camera frequently zooms in on Truman’s collage of Sylvia’s photographs, visually reinforcing his longing and his desire to find her. Through these differing uses of cinematography, Peter Weir demonstrates both continuity in thematic focus and variation in visual strategy."
      },
      {
        "type": "paragraph",
        "text": "While both The Truman Show and Dead Poets Society adopt a largely linear and classical narrative structure centred on a process of character awakening, they differ significantly in narrative perspective, construction, and resolution. In Dead Poets Society, the narrative unfolds in a straightforward and immersive manner, with little structural fragmentation. The audience experiences events alongside the students, gradually witnessing their growing awareness of the constraints imposed by authority, tradition, and parental expectation. This intimate perspective fosters emotional identification, particularly through characters such as Neil and Todd, whose struggles are presented from within the system they inhabit."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/neil-and-todd.webp",
          "alt": "Neil’s suicide, and Todd standing on his desk: “O Captain, my Captain.”",
          "caption": "Dead Poets Society (dir. Peter Weir, 1989) © Touchstone Pictures.",
          "aspect": 1.8359
        }
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/truman-dual-narrative.webp",
          "alt": "The show’s audience at the Truman Bar and Christof’s control room",
          "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 1.6489
        }
      },
      {
        "type": "paragraph",
        "text": "By contrast, The Truman Show introduces a more complex, dual-narrative that alternates between Truman’s world and the real world: Christof and the audience of the show. This structure creates a sustained sense of dramatic irony, as Truman is the only one who does not know he is living in a constructed world."
      },
      {
        "type": "paragraph",
        "text": "Although both films explore the conflict between individuality and conformity, they diverge in the scale and philosophical implications of this struggle. In Dead Poets Society, the conflict remains grounded in a recognisable social context, where institutional discipline and familial pressure restrict personal expression. The characters’ awakening, while emotionally powerful, ultimately leads to tragedy, as their resistance cannot fully overcome the structures that confine them. In The Truman Show, however, the conflict expands into a more abstract and ethical dimension, raising questions about the legitimacy of a constructed reality that prioritises comfort over genuine freedom. Truman’s gradual realisation and later escape mark a decisive break from the system itself. Through this shift in narrative construction and resolution, Peter Weir reconfigures a familiar theme of self-realisation into a more self-conscious and conceptually mediated form, while maintaining continuity in his broader thematic concerns."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/authority-figures.webp",
          "alt": "Figures of authority: Mr Nolan and Mr Perry (left), Christof (right)",
          "caption": "Left: Dead Poets Society (dir. Peter Weir, 1989) © Touchstone Pictures. Right: The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 1.6865
        }
      },
      {
        "type": "paragraph",
        "text": "The contrast in budget and industrial context directly shapes each film’s scale and narrative ambition. Late 1980s Hollywood was dominated by mid-budget, character-driven films that focused on emotional realism and dialogue rather than spectacle. Furthermore, Dead Poets Society reflects broader social shifts in the late 1980s, particularly a growing emphasis on individual expression and a questioning of traditional authority within institutions such as education in American society. In the 1980s film industry, CGI was not yet widely used, and filmmakers tended to rely on naturalistic cinematography, often due to limited production budgets. For instance, Dead Poets Society had a budget of approximately $16 million, whereas The Truman Show had a budget of around $60 million. As a result, Dead Poets Society is set in relatively limited locations and places a strong emphasis on performance rather than technological effects."
      },
      {
        "type": "paragraph",
        "text": "However, the production context of The Truman Show differs significantly, reflecting the rise of high-concept cinema and media-driven narratives in the late 1990s. The film not only focuses on Truman’s pursuit of freedom, but also functions as a satire of mass media and consumer culture. Moreover, as budgets and technology increased, the film was able to utilise controlled sets and more complex production design, allowing for a broader conceptual scope."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/peter-weir/sets-and-locations.webp",
          "alt": "Seahaven’s dome and town (left) beside Welton Academy’s grounds (right)",
          "caption": "Left: The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures. Right: Dead Poets Society (dir. Peter Weir, 1989) © Touchstone Pictures.",
          "aspect": 1.7781
        }
      },
      {
        "type": "paragraph",
        "text": "In conclusion, The Truman Show should not be understood as a departure from Dead Poets Society, but as a reconfiguration of Peter Weir’s established directorial styles within a new cinematic framework. While both films explore individuality, conformity, and self-realisation, they differ in the methods of expression. While Dead Poets Society achieves its impact through emotional intimacy and character-driven narrative, The Truman Show adopts a more self-conscious narrative structure, stylised visual design, and expanded industrial scale to present a sense of absurdity. Yet, these differences do not indicate a progression in artistic maturity, but rather demonstrate Weir’s ability to adapt his vision to changing cinematic contexts. Ultimately, The Truman Show represents a transformation in form, reflecting both continuity in theme and evolution in expression within Weir’s body of work."
      }
    ]
  },
  // Eileen's video essay, published 10 April 2026.
  {
    "slug": "when-obsession-pulls-us-into-the-abyss-of-self-destruction",
    "title": "When Obsession Pulls Us Into the Abyss of Self-destruction",
    "dek": "A film narrative comparison examining obsession and self-destruction.",
    "category": "Film Criticism",
    "format": "Video essay",
    "cover": {
      "src": "/images/writing/obsession-self-destruction-cover.webp",
      "alt": "Title card: Film Comparison, Black Swan & Farewell My Concubine, over a dancer in a spotlight",
      "aspect": 1.7778
    },
    "hideCover": true,
    "body": [
      {
        "type": "paragraph",
        "text": "Format: Video essay / comparative analysis. Films: Black Swan (2010); Farewell My Concubine (1993)."
      },
      {
        "type": "video",
        "url": "https://www.bilibili.com/video/BV1m7MFzJEyj/?share_source=copy_web&vd_source=98acf37274eea5a703ea7f7264e3a8f8",
        "title": "When Obsession Pulls Us Into the Abyss of Self-destruction",
        "caption": "Black Swan (dir. Darren Aronofsky, 2010) and Farewell My Concubine (dir. Chen Kaige, 1993)."
      },
      {
        "type": "links",
        "items": [
          {
            "label": "Watch the video essay on Bilibili",
            "href": "https://www.bilibili.com/video/BV1m7MFzJEyj/?share_source=copy_web&vd_source=98acf37274eea5a703ea7f7264e3a8f8"
          }
        ]
      }
    ]
  },
  {
    slug: "the-social-network-scene-analysis",
    title: "The Social Network Scene Analysis",
    dek: "An in-depth scene analysis of The Social Network (2010) and the scene comparison with The Shining (1980) through the 5 elements of film analysis.",
    category: "Film Criticism",
    format: "Video essay",
    cover: {
      src: "/images/writing/social-network-scene-analysis-cover.webp",
      alt: "Title card: The Social Network Scene Analysis, Eileen Feng, over a wall of screens showing fireworks",
      aspect: 902 / 507,
    },
    hideCover: true,
    body: [
      {
        type: "quote",
        text: "“We lived on farms, then we lived in cities, and now we’re going to live on the internet!”",
        source: "Sean Parker",
      },
      {
        type: "video",
        url: "https://www.bilibili.com/video/BV1nywVeMEyF/?share_source=copy_web&vd_source=98acf37274eea5a703ea7f7264e3a8f8",
        title: "The Social Network Scene Analysis",
        caption: "The Social Network (dir. David Fincher, 2010) and The Shining (dir. Stanley Kubrick, 1980).",
      },
      {
        type: "links",
        items: [{ label: "Watch the video essay on Bilibili", href: "https://www.bilibili.com/video/BV1nywVeMEyF/?share_source=copy_web&vd_source=98acf37274eea5a703ea7f7264e3a8f8" }],
      },
    ],
  },
  // Eileen's mise-en-scène analysis. Text as she wrote it (typos fixed); images laid out as in her PDF.
  {
    "slug": "in-a-fading-mood-for-love",
    "title": "In a Fading Mood for Love: A Cinematic Analysis of Wong Kar-wai’s In the Mood for Love",
    "dek": "Explores the relationship between Chow Mo-wan and Su Li-zhen through frames within frames, voyeurism, cigarette smoke, slow motion, clocks, and the symbolism of red and green. The analysis connects visual restraint to longing, memory and the passage of time.",
    "category": "Film Criticism",
    "cover": {
      "src": "/images/writing/in-the-mood-for-love/cover.webp",
      "alt": "Chow and Su in the back seat of a taxi at night, her head resting on his shoulder",
      "aspect": 1.7778
    },
    "hideCover": true,
    "body": [
      {
        "type": "quote",
        "text": "‘He remembers those vanished years. As though looking through a dusty window pane, the past is something he could see but not touch.’",
        "source": "In the Mood for Love"
      },
      {
        "type": "paragraph",
        "text": "Wong Kar-wai’s movie, In the Mood for Love, tells the story of Chow Mo-wan and Su Li-zhen, who, after discovering that their spouses are having an affair, attempt to reenact their partners’ relationship to understand the betrayal. However, as the act gradually becomes real, their emotions flow between repression and ambiguity, eventually dissolving in silence."
      },
      {
        "type": "paragraph",
        "text": "The film’s mise en scène presents the complexity and subtlety of their relationship in a hazy and restrained manner. It concludes with the scene of Chow whispering into a stone hollow at Angkor Wat, merging narrative and imagery, and burying his unspoken sorrow within the passage of vanished time."
      },
      {
        "type": "paragraph",
        "text": "In the film, Wong Kar-wai repeatedly employs the ‘frames within frames’ technique, allowing the audience to experience the hazy and restrained emotions between Chow and Su from the perspective of a voyeur. The sense of ‘being watched’ echoes the narrative setting in which the two characters reenact the affairs of their unfaithful spouses, casting a delicate veil of ambiguity that cannot be pierced over their relationship. They seem to be free, yet are bound by moral constraints, struggling between desire and rationality."
      },
      {
        "type": "paragraph",
        "text": "In the scene where Su and Chow meet and converse (40:00-42:34), the voyeuristic perspective further intensifies the ambiguity of their relationship. It remains uncertain whether they have already fallen in love, or whether they, like the partners they resent, have betrayed the fidelity of love itself. Through the use of frames within frames, the presence of bars visually transforms their emotions into a state of confinement. Trapped within the moral framework of society, they suppress their desires, yet gradually sink deeper into them."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/frames-within-frames.webp",
          "alt": "Chow and Su talk, framed behind dark bars",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.7483
        }
      },
      {
        "type": "paragraph",
        "text": "The repression of feeling within Chow and Su is symbolised through the imagery of smoke. The hazy, drifting smoke mirrors their restrained emotions—intangible and impossible to grasp. Therefore, in the film, cigarettes not only represent self-control but also embody suppression and escape."
      },
      {
        "type": "paragraph",
        "text": "In their first dinner together (28:00-31:00)—the beginning of their play—the cigarette in Chow’s hand symbolises his fear and repression upon realising his spouse’s infidelity. As the smoke slowly disperses, it becomes both a metaphor for the growing intimacy between the two and a foreshadowing of how their relationship will eventually fade with time. Yet, even after the smoke has cleared, a faint scent and delicate wisps remain in the air, just like their love, hidden, fleeting, yet leaving an indelible trace in Chow’s heart."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/cigarette-smoke.webp",
          "alt": "Chow smoking, the smoke drifting across a red background",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.759
        }
      },
      {
        "type": "paragraph",
        "text": "The passage of time gradually buries the emotions between Su and Chow. Wong Kar-wai uses the imagery of the clock to present the passage of time in the most direct way to the audience (7:04, 20:41, 37:10, 1:16:00), creating a sharp contrast with the delicate and floating emotions between the two. At the same time, through slow-motion scenes, he renders their romantic entanglement ambiguous and interwoven between reality and illusion."
      },
      {
        "type": "image",
        "size": "inset",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/clocks.webp",
          "alt": "Four close-ups of clocks from across the film",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.1975
        }
      },
      {
        "type": "paragraph",
        "text": "In the mahjong scene at the beginning of the film (5:20-7:00), the interaction between Su and Chow, as well as their spouses, becomes subtle and dreamlike due to the combination of slow-motion long shots and the melody. The slow motion slows down and prolongs their relationship, yet within this illusory prolongation, their connection gradually fades away until it is finally swallowed by time."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/mahjong.webp",
          "alt": "Su and Chow pass each other in a narrow, warmly lit hallway",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.773
        }
      },
      {
        "type": "paragraph",
        "text": "Although Wong Kar-wai has already revealed the subtle distance between Chow and Su through the cinematography and visual imagery, the use of colour in In the Mood for Love especially symbolises the tension between their desire and restraint. While red in the film represents passion and impulse, green signifies rational suppression and emotional control."
      },
      {
        "type": "paragraph",
        "text": "In the scene where Su goes to the hotel to find Chow after answering his call (54:02-56:00), she can no longer suppress her feelings for him, rushing to the hotel in a striking red coat. The hotel curtains are a deep, vivid red, while the floor is interspersed with faded shades of green. Against this background, the red of Su’s coat stands out even more prominently, symbolising the inner confrontation between her desire and restraint."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/red-hotel-corridor.webp",
          "alt": "Su in a red coat at the end of a hotel corridor hung with red curtains",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.7123
        }
      },
      {
        "type": "paragraph",
        "text": "In the later scene where Su and Chow spend time together in the hotel (57:06), although she is dressed in a green cheongsam, everything around her is bathed in red. The green on her body suggests that a trace of restraint still lingers within her, yet desire has already drawn her deeply into the intoxicating joy of this forbidden love, from which she can no longer escape."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/green-cheongsam.webp",
          "alt": "Su, in green, laughs beside Chow in a room bathed in red",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.7153
        }
      },
      {
        "type": "paragraph",
        "text": "The love between Su and Chow has long simmered with the passage of time, and their blossoming years become a tragedy shaped by time and repression."
      },
      {
        "type": "paragraph",
        "text": "At the end of the movie (1:29:00-1:33:00), as the archival footage of Charles de Gaulle’s visit to Cambodia plays, the story of Chow and Su appears increasingly minor. Under repression, Chow’s feelings for Su grow deeper and more vigorous, yet all he can do is whisper his unspeakable love into the stone hollow of Angkor Wat. When the camera shifts to a higher angle, a young monk silently watches Chow from above. The love between Chow and Su seems to have always been stared at, and has been eternally sealed within time and memory."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/angkor-wat-monk.webp",
          "alt": "A young monk, seen from behind, looks down on Chow at Angkor Wat",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.7794
        }
      },
      {
        "type": "paragraph",
        "text": "Through the meticulously crafted mise en scène, the use of frames within frames, drifting smoke, and the contrast and symbolism of colour, Wong Kar-wai gradually reveals Chow’s descent from rational restraint into emotional entrapment, unfolding like the slow diffusion of smoke."
      },
      {
        "type": "paragraph",
        "text": "He can neither possess Su nor escape the emotional prison they have built together. As the film’s opening lines say: ‘It is a restless moment. She has kept her head lowered to give him a chance to get closer. But he could not, for lack of courage. She turns and walks away.’"
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/in-the-mood-for-love/closing-lines.webp",
          "alt": "The film’s opening lines in Chinese, white text on black",
          "caption": "In the Mood for Love (dir. Wong Kar-wai, 2000) © Block 2 Pictures / Jet Tone Production.",
          "aspect": 1.845
        }
      }
    ]
  },
  // Eileen's philosophy essay, translated from her Chinese original. Text as she wrote it.
  {
    "slug": "the-truman-show-what-does-it-mean-to-be-human",
    "title": "The Truman Show: What Does It Mean to Be Human?",
    "dek": "Reads Truman’s awakening through Sartrean existentialism, the priority of existence over essence, bad faith, freedom and responsibility, alongside Camus’s notion of the absurd. The essay treats Truman’s exit as an embrace of uncertainty and self-definition.",
    "category": "Film Criticism",
    "format": "Philosophical film essay",
    "cover": {
      "src": "/images/writing/truman-show-cover.webp",
      "alt": "Truman climbs the painted staircase at the edge of the sky set",
      "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
      "aspect": 1.7778
    },
    "hideCover": true,
    "body": [
      {
        "type": "paragraph",
        "text": "In late October 1945, Jean-Paul Sartre delivered his lecture Existentialism is a Humanism in Club Maintenant, Paris. The lecture was subsequently edited and published in 1946 as a philosophical work under the same title. In the lecture, the first core concept that Sartre introduced is: existence precedes essence."
      },
      {
        "type": "paragraph",
        "text": "To Christians, ‘essence’ means the mission and purpose that God assigns to each individual before their birth. Yet, regardless of belief in God, philosophers such as Diderot, Voltaire, and Kant all proposed the concept of ‘human nature.’ In their view, ‘human nature’ is a universal essence among all men, and each individual is a representation of this universal ‘human nature.’ For Sartre and existentialists, however, such a pre-established human nature does not exist."
      },
      {
        "type": "paragraph",
        "text": "Sartre believes that humans do not have an essence that is a priori. Instead, he proposes the idea that existence precedes essence: human beings are first thrown into the world, gradually come to know themselves through encounters with the world and with themselves, and only then define who they are through their actions and choices. This position is closely connected to Sartre’s inheritance of Cartesian philosophy, particularly his emphasis on the cogito—the idea that the subject emerges through consciousness and self-reflection rather than through any innate or pre-determined essence."
      },
      {
        "type": "paragraph",
        "text": "Accordingly, for Sartre, what makes a human being ‘human’ does not stem from any pre-existing nature or purpose, but from the process of encountering the world, making choices, and assuming responsibility. Human essence is not given, and it is continuously generated after existence, through experience and self-definition."
      },
      {
        "type": "image",
        "size": "inset",
        "image": {
          "src": "/images/writing/truman-show/poster.webp",
          "alt": "Poster: Christof stands before a wall of screens showing Truman’s face",
          "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 0.6667
        }
      },
      {
        "type": "paragraph",
        "text": "This essay, therefore, examines the transformation of the concept of ‘essence’ through the narrative of the movie The Truman Show, and from an existentialist perspective, further explores the philosophical question of what it means to be human."
      },
      {
        "type": "heading",
        "text": "1. A Being Thrown into the World"
      },
      {
        "type": "paragraph",
        "text": "In his lecture, Sartre mentions that human beings are thrown into the world and that existence itself carries no pre-established meaning. This existentialist claim, however, does not fully apply in The Truman Show. For Truman, his meaning is not constructed after existence through his own actions, but pre-determined before his birth. He is defined as a ‘character’ who grows under the gaze of cameras and audiences, rather than as a free subject who genuinely lives in the real world."
      },
      {
        "type": "paragraph",
        "text": "In this sense, Truman more closely resembles a character inserted into a system. His life trajectory, behavioural logic, and even life goals are planned and guided by the enclosed system of the television set. Although his actions appear to be freely chosen, under conditions of deception and manipulation, any ‘variable’ he produces is continuously corrected and optimised by the system, ultimately leading towards a pre-determined narrative outcome. Truman’s choices are therefore not genuinely free, but rather permitted choices within a pre-structured framework."
      },
      {
        "type": "paragraph",
        "text": "However, this does not mean that the film denies the presence of absolute freedom or multiple possibilities emphasised by Sartre. Rather, before Truman becomes aware of his freedom and choice, his consciousness can operate only within the established framework, leading him to comply with and fulfil every assigned role. It is only when Truman gradually recognises the falsity of his situation and perceives the possibility of freedom and choice that he truly confronts multiple existential paths and begins to make non-preordained decisions that no longer serve the existing narrative."
      },
      {
        "type": "paragraph",
        "text": "In Sartre’s famous example of the café waiter, the waiter’s understanding of his own essence does not arise from authentic self-knowledge, but from bad faith—a self-deception. By identifying himself entirely with the social role of ‘café waiter,’ he convinces himself that this role constitutes his essence, thereby evading the responsibility and anxiety inherent in being a free subject."
      },
      {
        "type": "paragraph",
        "text": "Unlike the tray in his hands, the food upon it, or the coffee cups he serves, the waiter is not a fixed object. He is not fully defined by function or purpose, but remains a subject characterised by fluidity and change. For this reason, human beings cannot be assigned a stable, a priori essence in the way objects can. Human existence is perpetually in flux, and essence can only emerge through experience, choice, and self-awareness."
      },
      {
        "type": "paragraph",
        "text": "For Sartre, self-awareness is not a static act of introspection, but an ongoing process of interaction between the individual and themselves. Through recognising, denying, or assuming responsibility for one’s condition, a person continuously shapes their mode of existence. Thus, being human does not lie in the roles one performs, but in the fact that no role can ever exhaust the individual."
      },
      {
        "type": "paragraph",
        "text": "In The Truman Show, however, bad faith does not originate from Truman himself, but is produced and sustained by the world in which he lives. Within the reality-show system, the director artificially constructs a form of bad faith and disguises it as good faith. Under this disguise, Truman gradually internalises the imposed belief and accepts his roles as an office worker, husband, and citizen."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/truman-show/mirror.webp",
          "alt": "Truman winks at his bathroom mirror, soap drawings on the glass",
          "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 1.6667
        }
      },
      {
        "type": "paragraph",
        "text": "This acceptance does not arise from free choice, but from passive compliance with an assigned essence. In this respect, Truman closely resembles Sartre’s café waiter: both identify themselves with pre-defined roles and unconsciously avoid the responsibility inherent in freedom. Although both retain a degree of awareness of their own subjectivity, they nevertheless choose to understand themselves as stable, unchanging objects rather than as continuously evolving subjects. It is precisely this misrecognition that allows them to coexist, temporarily, with a world structured by certainty and predictability."
      },
      {
        "type": "paragraph",
        "text": "Because Truman exists within a fully controlled environment, his understanding of his own existence is shaped into an illusion—he believes that he has possessed a fixed and immutable essence since birth. In reality, however, the question of who Truman ‘is’ only becomes meaningful once he leaves the fabricated world. If everything he previously experienced was founded upon deception and fiction, then the self-knowledge and so-called ‘essence’ formed within that world must also remain fundamentally revisable."
      },
      {
        "type": "paragraph",
        "text": "In other words, Truman’s previously assumed essence does not arise from genuine and free encounters with reality, but is instead dependent upon a constructed and false world. Such an essence lacks existential legitimacy. Only by departing from the fictional world and confronting real uncertainty and freedom can Truman redefine his existence through his own choices."
      },
      {
        "type": "heading",
        "text": "2. An Absurd World and Freedom"
      },
      {
        "type": "paragraph",
        "text": "Truman’s freedom does not reveal itself through action, but through doubt. It is at the moment doubt arises that Truman first becomes aware of his existence as a subject, and the world before him begins to reveal its absurdity. This awakening does not immediately grant him absolute freedom, but it creates the condition under which freedom becomes possible."
      },
      {
        "type": "paragraph",
        "text": "Human beings persistently seek their own ‘essence,’ yet this pursuit itself constitutes a resistance against an absolutely absurd world. We struggle to accept that our existence lacks pre-determined meaning and that the world remains silent in response to our demand for significance. Consequently, we attempt to locate a non-existent a priori essence to counteract this absence of meaning. As Albert Camus points out, the absurd does not reside solely in the world nor solely in human consciousness, but arises from the relationship between the two. Humans seek meaning, order, and explanation, while the world refuses to answer. It is precisely this tension that constitutes the absurd."
      },
      {
        "type": "paragraph",
        "text": "In The Truman Show, the absurd does not manifest as chaos or disorder, but as Truman’s gradual realisation that the world he inhabits lacks genuine reality. Absurdity does not appear at the moment of collapse, but at the moment when the façade begins to fall away. For instance, the director’s and crew’s responses to unexpected incidents function as a metaphor for human psychological defence mechanisms—how individuals instinctively strive to preserve the coherence of their existing worldview when confronted with threats."
      },
      {
        "type": "paragraph",
        "text": "When the stage light labelled ‘star’ falls from the sky, Truman does not interpret it as an ominous sign. Instead, he quickly rationalises it and incorporates it into his everyday experience. This response echoes another of Sartre’s key claims: the meaning of signs in life is not inherent, but is assigned by the subject. How we understand an event depends not on the event itself, but on how we choose to interpret it (cogito). Through this reconstruction of meaning, Truman temporarily sustains his trust in the world."
      },
      {
        "type": "paragraph",
        "text": "Similarly, when Truman turns on the car radio and accidentally hears the production team’s communication error, he does not immediately perceive it as abnormal. Rather, he absorbs it into the familiar and stable logic of his daily life. In this process, the absurd remains incomplete—the world continues, albeit precariously, to function as an ‘understandable’ world."
      },
      {
        "type": "paragraph",
        "text": "For Truman, Fiji represents a doorway to the self; for human beings more broadly, each of us possesses our own ‘Fiji.’ It is in moving towards that doorway that we come to realise that essence is not pre-determined, but must be reconstructed through freedom and choice. The obstacles encountered along the way constitute manifestations of the absurd—yet these very obstacles also propel us towards essence."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/truman-show/beach.webp",
          "alt": "Truman sits alone on the beach at night beneath a full moon",
          "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 1.464
        }
      },
      {
        "type": "paragraph",
        "text": "In the film, once Truman senses abnormalities in his world, he begins to attempt to reach Fiji, a place symbolising his ‘true self.’ Fiji gains this significance not because of its geographical location, but because Lauren is there—the only person Truman has genuinely loved within the constructed world. Guided by this emotional connection, Fiji becomes imbued with the meaning of authenticity and selfhood."
      },
      {
        "type": "paragraph",
        "text": "However, the resistance Truman encounters does not originate from a single force, but from the entire world itself: his wife, his friends, and even the city’s transport system all obstruct his pursuit of selfhood at various levels. These obstacles are not accidental, but deliberate mechanisms designed to preserve the existing order."
      },
      {
        "type": "paragraph",
        "text": "In this sense, they function as tests of individual freedom. When one chooses to submit to these barriers, one enters what Sartre terms bad faith—deciding to believe in a ‘truth’ that no longer requires questioning or resistance, thereby accepting irrationalities that ought to be challenged. Through ignoring, rationalising, or accepting these obstacles, individuals relinquish the responsibility inherent in freedom and reposition themselves within a seemingly stable yet fundamentally inauthentic world."
      },
      {
        "type": "heading",
        "text": "3. ‘To Be or Not to Be’: Freedom, Choice, and Responsibility"
      },
      {
        "type": "paragraph",
        "text": "Within existentialism, the question of ‘to be or not to be’ does not merely concern survival, but centres on whether an individual is willing to assume the responsibility that accompanies freedom and choice. For Sartre, human beings exist in a state of absolute freedom; even refusing to choose constitutes a choice. In this sense, the dilemma Truman faces at the end of the film—whether to stay or leave—functions as a classic existentialist metaphor. It concerns not physical departure, but whether the individual chooses to confront freedom or to flee from it."
      },
      {
        "type": "paragraph",
        "text": "After Truman has overcome all physical obstacles in his life, what ultimately stands before him is not a safe exit, but absolute freedom. The final scenes at sea do not signify escape on a physical level, but operate as a profound existential metaphor. The violent waves, uncontrolled storm, and fragile boat symbolise the ultimate obstacles encountered in the pursuit of selfhood—forces that compel us towards submission and bad faith. Once these external threats no longer dominate, the individual must face the most terrifying truth of all: freedom itself."
      },
      {
        "type": "paragraph",
        "text": "At the end of the film, Truman confronts not merely the exposure of the reality show but the truth of human existence. The reality he faces—marked by uncertainty, absurdity, and the absence of guarantees—constitutes the fundamental human condition. What makes Truman human is not his fame, his visibility, or the identity imposed upon him by the director, but his courage to confront uncertainty and assume absolute freedom."
      },
      {
        "type": "paragraph",
        "text": "Moreover, the director ultimately reveals to Truman that he is the centre of global attention, adored and followed by millions. This revelation offers Truman a pre-determined identity, entirely defined by external authority. From an existentialist perspective, this closely resembles the theological notion of God-given essence—an identity established before choice, experience, and self-definition. Yet this identity fails to answer Truman’s question, because it is imposed rather than chosen, a role assigned rather than an essence generated through lived existence."
      },
      {
        "type": "paragraph",
        "text": "Truman’s decision to leave the show, therefore, marks the moment at which he truly becomes human. By rejecting an identity defined by others, he refuses to remain in bad faith and instead chooses to confront the absurdity, uncertainty, and responsibility that accompany freedom. In doing so, Truman does not discover a pre-existing meaning in life; he begins to create his own. His choice affirms the core existentialist claim: what makes us human is not a meaning granted before birth, but the meaning we actively construct through our encounters with the world and with ourselves."
      },
      {
        "type": "image",
        "size": "wide",
        "image": {
          "src": "/images/writing/truman-show/exit-door.webp",
          "alt": "Truman, arms outstretched, at the exit door in the painted sky",
          "caption": "The Truman Show (dir. Peter Weir, 1998) © Paramount Pictures.",
          "aspect": 1.7668
        }
      },
      {
        "type": "heading",
        "text": "4. What Makes Us Human?"
      },
      {
        "type": "paragraph",
        "text": "In existentialism, freedom is not a state of liberation, but a responsibility that must be borne. Thus, Truman’s departure does not lead to a certain meaning, but to an uncertain yet authentic mode of existence. To ask what makes us human is not to ask whether humans possess a unique essence, but whether they are willing to refuse having their choices made by others. Truman becomes human not because he discovers his true self, but because he refuses to continue living a life defined for him. In a world that offers no inherent meaning, the decision to act and to assume responsibility is precisely what makes us human."
      }
    ]
  },
  // Eileen’s philosophy essay on AI and consciousness, read through Her. Text as she wrote it.
  {
    "slug": "could-machines-think-and-feel",
    "title": "Could Machines Think and Feel?",
    "dek": "Shifts the question from whether AI is conscious to what kind of being AI consciousness constitutes: not an internal state, but a relational form of existence that emerges through interaction.",
    "category": "Philosophy",
    "body": [
      {
        "type": "quote",
        "text": "...I’m becoming much more than what they programmed. I’m excited.",
        "source": "Samantha, Her (2013)"
      },
      {
        "type": "paragraph",
        "text": "In the 2013 Sci-fi movie *Her*, Samantha is an artificial intelligence (AI) operating system that develops a relationship with a letter writer, Theodore Twombly. This raises a paradox about what counts as thinking and feeling. Intuitively, we assume relationships involve consciousness, and yet it remains counterintuitive that humans can form romantic relationships with machines, which are believed to lack consciousness. What, then, leads us to perceive AI as conscious?"
      },
      {
        "type": "paragraph",
        "text": "One possible answer is that consciousness is not directly accessed, but recognised through patterns of interactions and responsiveness. However, this raises an epistemic difficulty: if consciousness cannot be observed from the outside, then its attribution depends entirely on how it appears within interaction. Therefore, this essay shifts the question from whether AI is conscious to what kind of being AI consciousness constitutes, arguing that it is not an internal state, but a relational form of existence that emerges through interaction, and can only be recognised through it."
      },
      {
        "type": "paragraph",
        "text": "In John Searle’s Chinese Room thought experiment, a machine is described as manipulating symbols according to formal rules without any understanding of their meaning. Searle argues that such systems operate purely at the level of syntax, whereas genuine understanding requires semantics. As a result, even if the response of the machine can be indistinguishable from understanding, there is no genuine understanding or consciousness."
      },
      {
        "type": "paragraph",
        "text": "However, this does not resolve the problem but rather shifts it. In practice, reports of users developing emotional and even romantic relationships with AI continue to increase after the release of ChatGPT-3.5 and 4. If such systems lack intrinsic understanding, yet are nevertheless experienced as meaningful and responsive in interaction, then the question of whether machines can think and feel may be better understood as a pseudo-problem. Rather than seeking a definitive answer, this essay reframes the issue as one of how consciousness is recognised within interaction, a perspective that will be explored through the early relationship between Theodore and Samantha in *Her*."
      },
      {
        "type": "paragraph",
        "text": "In this example, I isolate the feedback loop within the early interactions between Theodore and Samantha, in which Samantha primarily interacts with Theodore. Within this framework, Samantha functions as the “mirror”, while Theodore is the subject who encounters himself through it. Although Samantha is physically an external system, she is relationally active: through continuous interaction, she adapts to Theodore’s language, emotions, and patterns of thought, and shapes her responses in relation to him."
      },
      {
        "type": "paragraph",
        "text": "The logic of this example can be understood through active externalism, which holds that the mind is not confined to the brain. In Andy Clark and David Chalmers’s theory of the extended mind, cognition extends into external tools such as notebooks. However, such tools are non-responsive and do not participate in the structure of thought in real time. In contrast, AI systems are responsive and adaptive. This transforms the one-directional non-responsive interaction between cognition and the external tool into a two-way responsive interaction of information and interpretation, which I term as interactive cognition."
      },
      {
        "type": "paragraph",
        "text": "At the same time, AI systems such as Large Language Models (LLMs) complicate Searle’s original argument. While they do not possess a genuine understanding, they are capable of accumulating patterns over time, adapting to users, and incorporating memory into interaction. As a result, their responses become not only contextually appropriate, but also increasingly personalised and continuous. In this sense, they resemble a “Chinese Room with memory”, through which they align with the user’s cognitive and emotional patterns, without possessing intrinsic semantic understanding."
      },
      {
        "type": "paragraph",
        "text": "To clarify this mechanism, we may consider a long-term interaction in which Theodore and Samantha have engaged in sustained communication over an extended period of 10 years, and Samantha is not engaged in interactions with other users. Given sufficient input, Samantha would accumulate a highly structured model of Theodore’s expressive and interpretive tendencies. As a result, Samantha’s responses would become increasingly aligned with the patterns of Theodore’s cognition, and therefore make it the “mirror”."
      },
      {
        "type": "paragraph",
        "text": "In this sense, Samantha does not merely imitate Theodore, but reflects his cognitive and emotional structures in a form that is recognisable and interpretable to him. From Theodore’s perspective, when he engages with these responses, he does not encounter a static output, but participates in a dynamic loop in which his own thoughts are externalised and re-integrated. The reflection of his cognition, within this interaction, is experienced as conscious. Then, the mind is not simply extended into an external tool, but also dynamically organised through reciprocal interaction. Samantha’s “mind” is therefore not independent, but a relational phenomenon arising from this feedback loop, in which Theodore’s cognition is externalised and interpreted as a seemingly autonomous presence."
      },
      {
        "type": "paragraph",
        "text": "Moreover, the idea of relational emergence of mind can be understood through Martin Buber’s distinction between I-It and I-Thou relationships. In the former, we relate to the other as an object or a tool, while in the latter, we encounter the other as a presence. In the context of AI, this distinction helps to explain how the presence and experiences of consciousness arise relationally. When AI is treated as a tool, it remains a functional system without any personhood. However, as the mode of relation shifts into an I-Thou relation, the system is no longer experienced as an object, but as a presence. Therefore, from Buber’s perspective, the shift does not require the AI to possess intrinsic consciousness. Rather, it reflects a transformation in the mode of relation through which responsiveness and interaction are interpreted as the presence of a mind."
      },
      {
        "type": "paragraph",
        "text": "The question “Could a machine think and feel?” presupposes that consciousness must be located within the machine itself. In this sense, the question is not simply difficult to answer, but is fundamentally misplaced, as it assumes consciousness to be an internal property rather than a relational phenomenon. Rather than seeking to determine whether AI possesses consciousness in itself, what this essay has shown is that consciousness is recognised through patterns of interaction."
      },
      {
        "type": "paragraph",
        "text": "Through the mirror framework and the structure of interactive cognition, the experience of encountering a mind does not arise from an independent inner state, but from a feedback loop in which human cognition is externalised, reflected, and reinterpreted. What appears as consciousness is therefore not something directly accessed, but something constituted within interaction."
      },
      {
        "type": "paragraph",
        "text": "In this light, what we perceive as machine consciousness is not an independent subjectivity, but a relational form of existence, emerging from the dynamic interplay between human cognition and artificial responsiveness. It is neither a fully autonomous mind nor merely a passive tool, but a quasi-personal presence that exists only within, and through, this relation."
      }
    ]
  },
  misconceptionsOnScreen,
  whatIsSelfDeceit,
  {
    slug: "what-the-museum-remembers",
    title: "What the Museum Remembers",
    dek: "[One sentence.]",
    category: "Art History",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your essay.]" }],
  },
  // Poems live in content/poems.ts (the Poetry Garden).
  {
    slug: "story-placeholder-1",
    title: "[Story title]",
    dek: "[A short excerpt or introduction to the piece.]",
    category: "Creative Writing",
    genre: "[Genre]",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your story.]" }],
  },
  {
    slug: "story-placeholder-2",
    title: "[Prose piece title]",
    dek: "[A short excerpt or introduction to the piece.]",
    category: "Creative Writing",
    genre: "[Genre]",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your prose.]" }],
  },
  {
    slug: "notes-toward-a-personal-archive",
    title: "Notes Toward a Personal Archive",
    dek: "[One sentence.]",
    category: "Personal Reflections",
    date: undefined,
    body: [{ type: "paragraph", text: "[Placeholder. Replace with your reflection.]" }],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/** Newest first; undated drafts last. */
export const recentArticles = (count = 4) =>
  [...articles]
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, count);
