import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X } from "lucide-react"

const LETTER_BODY = `Hey Princess. Im not sure if you'll even see this lmao. today is on 31/Sptember/2026 its almost midnight.

Hope you are doing good. Hope your flu ended and you are ok now. Hope everything is doing better and all and you are really okkk. Hope everything is alright even if ik nursing is driving you nuts dw. Hope everything is ok.

I just wanted to tell you After the break and then you sent me the paragraph and we broke up in good terms and spoke your heart out ig I was in so much to process in that timeframe yk. Like so much emotions at once, felt sorry, sad, confused, hurt, relieved, lowkey happy, all emotions and couldn't really express what I would say thats why im sending this rn cause ive come to terms and im okk rnn.

We started talking on July 22, I remember that night.

I remember everything to the smallest details Princess.

I remember you prefer juice than tea or coffee, I remember how we planned we'd have a tatto date and I remember you wanted a back one and spine one if you'll be ready.

I remember how we were talking about pirating movies and crunchy roll for anime and how we'd never pay.

How mbappe would go crazy watching the new Exposito movie where she kisses another dude and ig does more than that.

I remember you giving me the link to the free Spotify plan for two months, I have to pay btw before they take their money from my Mpesa lol.

How you told me you felt when you watched videos of heights and felt scared.

How you felt disappointed when your dye didn't turn out red and turned out brownish. I really like the color though it's still really nice.

I remember you telling me you were watching sterling point and off campus which I never really finished I'll finish it😭

I remember your laugh lmaooo, time you made me laugh esp telling me how you were playing charades with Maina and Manu and talking about Nairobi topic Manu said kiroboto kwa kikamba, laughed my ass off ngl.

How you felt bad going to Garden city alone as solo date and you saw people with dates and told yourself you'd never go there again.

How you loved lamine before olise, How we talked how we'd lick Olises legs me with one you with other,

How we talked of Dembeles wife and her elegant style esp the cowboy ish vibe style, how we talked of sakina.

How you told me Sam and cat was your fav Nickelodeon show esp when they made collabs with other shows like Henry danger etc, and how you liked Victorious and Fairy odd parents.

How we talked and admired Millie Bobbie and her platonic relationship with Noah,

How you were skipping driving school classes and eloping to some local🤣🤣

How we played pool in imessages and it was really fun, didn't let you win fs i still feel you let me have win at some points.

Lemme not get to our imessages texts🤣 i still cherish the moments 

Even our WhatsApp texts with Nyot and njeri might be cringe rn but it was fun

Also how you saw Darwin's dih as a kid lmaoooo

I remember how you even liked The luo guy called Gravin

I remember the many kittens you showed me they were really cute btw, also Tommy

And also Summer may she rest in peace

I hope you still like Pinacolada ice cream and chocolate ganache cake ty for putting me to them

Also how your favorite power rangers movie is Dino charge

Also your brother Felix doing his finals this year, wish him the best

I could go on for so long but I just cherished every moment and they all mean so much to me that's why I can't forget for sure and I really enjoyed every single one and you are really special to me, my first love ig.

Elsie ty for all what we shared and even if we had a bucket list with so many stuff still unchecked but doesn't matter rn anyway it was fun making it with you.

I really wanted to know so much about you even what no one cared to know. I had already made so much progress lol.

Also really wanted we go to movies together since you've never been there I almost bought tickets .

At some point we though we were twins

Have same music taste it's crazyyyyyy

And many things in common.

And im really glad you liked me despite everything and im more of a homebody ykk i dont party alot and drink or smoke.

I'll still think of you when I listen to Gracie abrams and Noah and Don Toliver and Ed.

Ig after we started dating and I started to notice the distance ig I didn't want to accept it at all. I was in denial so ig I really tried to keep what was sinking afloat by sending many texts, love bombing, reassurances, and I even acted weird at some point idkk but all this was cause of the anxious attachments and ig made me do all that as I didn't know really yk and so much many things which made situation worse. I didn't realize. im not justifying myself thoughhh

Even before the break I had realized this might be gone but didn't want to accept it at really wanted all to work but it's really okkk it didn't work like we wanted which is really ok but atleast we got to share so much.

I mean I wasn't perfect also. This was my first relationship ig I was really nervous and had anxious attachment and really overthought and so much more esp when the spark disappeared and couldn't talk normally and all and pressured to do everything right and that's where I went wrong, disappointed myself couple times and also you, and also really sorry for some stuff might have been overwhelming to you and you didn't like and just couldn't tell me. also disappointed you the time i came to your place lmao i was on weed and quite nervous lmaooo. And we both had our flaws at some point but doesn't matter as much.

But I had to accept it was ending and I was really afraid of this from the start but it's easier when I accept it and I'm really Okk with everything rn and come to terms with it. Ik you really cared for me and you were really afraid to hurt my feelings, ty for that and many more things.

Elsie I really love you and appreciate you and care for you. You can always reach out if you ever want to talk, no pressure at all. But what we had was really good even if it had couple of rough parts I did enjoy what was good, what was bad ig it's life and nothing really and has already happened but I could change couple of stuff if I had ability but I can't rnnn and I cried some point cause I saw this coming.

Anywayyy thats all I had to say before it's a close to this chapterrrr, sadly, but everything happens for a reason ig . Im still really glad you are my first kiss i still cherish it and many stuff, even if we did a lot that night maybe we shouldn't have.

But I've learnt to accept that the relationship didn't work and it's okay as long you are really comfortable, i just want to see you happy and all.

Oh and btw normally im called Karani like normally though both names but mostly Karani not Ted but after you called me Ted normally it just hit different and I liked it it was just a tiny detail i lowkey liked. you can call me whatever though even Teddy.

Ty Elsie stay safe princess. and ill always cherish you, actual love you the real type of love and care, and i will never forget about a princess I got to call mine at some point in my life.
goodluck in everythingggg
and im sure Gladys also liked you <3
ty for being someone I thanked God for and wrote in my gratitube jar

stay Safe sleepyhead. (hope you dont fall asleep suddenly these days lmao)

Olise wannabe.`

export default function FarewellLetter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button, fixed bottom-left */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative flex items-center justify-center">
          {/* Pulsing glow rings */}
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-rose-400/50"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-pink-400/50"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />

          {/* NEW badge */}
          <motion.span
            className="absolute -right-2 -top-2 z-10 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-950 shadow-md"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            NEW
          </motion.span>

          {/* Main button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative z-0 flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/40"
          >
            <motion.span
              className="inline-flex"
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={18} fill="currentColor" />
            </motion.span>
            Click me, I'm new!
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-rose-500/20 bg-gradient-to-b from-[#2a0f1c] to-[#1a0e14] p-6 shadow-2xl shadow-rose-500/10 sm:p-8"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-pink-100/50 transition-colors hover:bg-white/5 hover:text-pink-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Heading */}
              <h2 className="mb-6 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Elsie
              </h2>

              {/* Letter body */}
              <p className="whitespace-pre-line font-serif text-[15px] leading-relaxed text-pink-50/90">
                {LETTER_BODY}
              </p>

              {/* Decorative divider */}
              <div className="mt-8 flex items-center justify-center gap-3 text-pink-300/40">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300/30" />
                <Heart size={16} fill="currentColor" />
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300/30" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
