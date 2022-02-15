import { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import styles from '../styles/Home.module.css';
import Head from 'next/head';

const colorPallettes = [
  [
    "text-emerald-100",
    "from-teal-900",
    "to-emerald-100",
    "shadow-[0_0_0_1px_rgb(209,250,229)_inset]",
    "rgb(209,250,229)",
    "bg-emerald-100",
    "text-teal-900",
  ],
  [
    "text-cyan-100",
    "from-sky-900",
    "to-cyan-100",
    "shadow-[0_0_0_1px_rgb(207,250,254)_inset]",
    "rgb(207,250,254)",
    "bg-cyan-100",
    "text-sky-900",
  ],
  [
    "text-pink-100",
    "from-rose-900",
    "to-pink-100",
    "shadow-[0_0_0_1px_rgb(252,231,243)_inset]",
    "rgb(252,231,243)",
    "bg-pink-100",
    "text-rose-900",
  ],
  [
    "text-lime-100",
    "from-green-900",
    "to-lime-100",
    "shadow-[0_0_0_1px_rgb(236,252,203)_inset]",
    "rgb(236,252,203)",
    "bg-lime-100",
    "text-green-900",
  ],
];
const tagsString =
  "0.3, <#743482078410047489>, ==, Promise.all, React.FC, \\n, ads, advanced_linux, advertising, anyone, ask, ask2ask, asking, async, asyncio-loop, beginner_linux, bin, bitshift, bitwise, bitwisebinary, bitwiseunary, bots, byox, careers, cb, cbshort, cflags, challenges, charmath, cheating, clamp, client-mods, code, codeblocks, codesnippetjs, codesnippetpython, country, cppnotc, creationdate, crosspost, cssgrid, cssonly, ctfs, d.js, d.py, date, ddev, deadchat, discouraged-topics, diy, djslangfirst, dm, dom-listening, editors, english, entitlement, error, error-structure, error500, esm, exercises, express, fastify, files, flexbox, float, floating, flutter, fmtcode, foobar, fp, freelance, g, gameengines, gettinganswers, googleit, gs, hacking, hammer, headings, help, helpme, homework, hosting, html, htmlonly, htmlskeleton, id-class, indent, innerHTML, intents, java, java==, javadebug, javaide, javajs, javamod, javastatic, joindate, joking, jquery, js_async, jschannel, jserror, jsfiddle, jsondb, justask, justifyalign, kali, kotlin, langfirstbotlater, language, laravel, largehosting, learnc++, learncs, learncsharp, learnjava, learnjs, learnpython, learnregex, learnrust, linux, lua, man, memory, memorylinux, memorymacos, memorywindows, moment.js, multi, mysql, nevar, node-gyp, nohello, nojquery, nonavlist, noscreenshots, notmyc, novar, on*, optionresultmap, pastebin, path, patience, playground, projects, react-async, roblox, roles, scanner, showcase, spamdm, spoonfeeding, sqli, startingout, teach2fish, tias, timediff, tinyhosting, tokenleak, topic, truthtable, try, tutoring, type=module, typeinterfaces, ub, undefined, unity, vampire, var, vc, videos, vscdebug, vulgar, w3s, w3schools, which-js, whyts, win7, wsid, x86, xpost, xyproblem, xyz";

const tags = tagsString.split(", ");

const Index = () => {
  const [colorPallette, setColorPallette] = useState(colorPallettes[0]);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [animation, setAnimation] = useState(false);
  const [up, setUp] = useState(false);
  const inputRef = useRef(null);

  // Auto focus
  useEffect(() => {
    setColorPallette(
      colorPallettes[Math.floor(Math.random() * colorPallettes.length)]
    );
    inputRef?.current?.focus();
  }, []);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setQuery(value), 100);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  // Wait in resetting search bar's position
  useEffect(() => {
    if (query) return setUp(true);
    const timer = setTimeout(() => setUp(false), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Query
  useEffect(() => {
    if (!query) return;
    const reg = new RegExp(escapeRegExp(query), "i");
    const a = tags
      .map(
        (m) =>
          m.match(reg) && { m: m.match(reg)[0], sa: m.split(m.match(reg)[0]) }
      )
      .filter((f) => !!f)
      .map((p) => {
        const temp = [];
        p.sa.forEach((s, i) => {
          temp.push({ w: s, c: "" });
          if (i + 1 < p.sa.length) temp.push({ w: p.m, c: "text-red-500" });
        });
        return temp;
      });

    setResults(a);
  }, [query]);

  return (
    <>
    <Head>
      <title>TCD Tags</title>
      <meta description="Search TCD tags" />
      <meta property="og:title" content="TCD Tags" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tcd-tags.netlify.app" />
      <meta property="og:image" content="https://cdn.discordapp.com/attachments/760031614389452841/943244484437770321/tcdlogo.png" />
      <meta property="og:description" content="Search TCD tags" />
      <meta property="og:site_name" content="TCD Tags" />
      <meta name="theme-color" content="#ff006a" />
    </Head>
    <div
      style={
        animation
          ? {
              background:
                "linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
            }
          : {}
      }
      className={`min-h-screen p-4 md:p-10 bg-gradient-to-tr ${colorPallette[1]} ${colorPallette[2]} grid grid-columns-1`}
    >
      <div
        className={`content-start w-full min-h-full rounded-lg shadow-2xl bg-black/10 grid grid-columns-1 place-content-center overflow-y-hidden`}
      >
        <div
          className={`${
            up ? "translate-y-20" : "translate-y-60"
          } grid grid-columns-1 gap-2 transition-all duration-[1000] ease-in`}
        >
          <form
            className={`w-[26rem] md:w-[32rem] ${colorPallette[3]} flex py-2 px-4`}
            onSubmit={(e) => {
              e.preventDefault();
              if (["animation", "animate"].includes(query.toLowerCase()))
                setAnimation((a) => !a), setValue("");
            }}
          >
            <label className="grid grid-columns-1 place-items-center">
              <svg
                width="24"
                height="30"
                viewBox="0 0 44 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.0607 13.0607C43.6464 12.4749 43.6464 11.5251 43.0607 10.9393L33.5147 1.3934C32.9289 0.807615 31.9792 0.807615 31.3934 1.3934C30.8076 1.97919 30.8076 2.92893 31.3934 3.51472L39.8787 12L31.3934 20.4853C30.8076 21.0711 30.8076 22.0208 31.3934 22.6066C31.9792 23.1924 32.9289 23.1924 33.5147 22.6066L43.0607 13.0607ZM-1.31134e-07 13.5L42 13.5L42 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
                  fill={`${colorPallette[4]}`}
                />
              </svg>
            </label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={value}
              onInput={(e) => setValue(e.target.value)}
              spellCheck={false}
              className={`flex-1 w-full font-fira ${colorPallette[0]} text-[2rem] placeholder:text-black/10 bg-transparent h-14 focus:outline-none ml-4`}
            />
          </form>

          <div
            style={{ scrollbarWidth: "none" }}
            className={`${styles.scroll} w-[26rem] md:w-[32rem] max-h-96 overflow-y-scroll grid grid-columns-1 content-start gap-2`}
          >
            {results.map((item, i) => (
              <ListItem
                key={i}
                n={item}
                show={!!query}
                current={colorPallette}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const ListItem = ({ n, show, current }) => {
  return (
    <Transition
      as={"div"}
      show={show}
      enter={`transition-opacity duration-1000`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-400"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`text-[2rem] font-fira ${current[6]} ${current[5]} ${current[3]} rounded-md py-2 px-4 flex`}
      >
        <label className="grid grid-columns-1 place-items-center">
          <svg
            width="24"
            height="30"
            viewBox="0 0 130 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.9805 131.64C37.6705 126.383 34.7782 120.75 29.5203 119.06C24.2624 117.37 18.63 120.262 16.9399 125.52L35.9805 131.64ZM14.0601 134.48C12.37 139.738 15.2624 145.37 20.5203 147.06C25.7782 148.75 31.4106 145.858 33.1007 140.6L14.0601 134.48ZM85.9805 131.64C87.6705 126.383 84.7782 120.75 79.5203 119.06C74.2624 117.37 68.63 120.262 66.9399 125.52L85.9805 131.64ZM64.0601 134.48C62.37 139.738 65.2624 145.37 70.5203 147.06C75.7782 148.75 81.4106 145.858 83.1007 140.6L64.0601 134.48ZM98.9805 74.6405C100.671 69.3826 97.7782 63.7501 92.5203 62.0601C87.2624 60.37 81.63 63.2624 79.9399 68.5203L98.9805 74.6405ZM77.0601 77.4797C75.37 82.7376 78.2624 88.37 83.5203 90.0601C88.7782 91.7501 94.4106 88.8578 96.1007 83.5999L77.0601 77.4797ZM47.9805 74.6405C49.6705 69.3826 46.7782 63.7501 41.5203 62.0601C36.2624 60.37 30.63 63.2624 28.9399 68.5203L47.9805 74.6405ZM26.0601 77.4797C24.37 82.7376 27.2624 88.37 32.5203 90.0601C37.7782 91.7501 43.4106 88.8578 45.1007 83.5999L26.0601 77.4797ZM63.9805 13.6405C65.6705 8.38256 62.7782 2.75013 57.5203 1.06009C52.2624 -0.629952 46.63 2.26237 44.9399 7.52028L63.9805 13.6405ZM42.0601 16.4797C40.37 21.7376 43.2624 27.37 48.5203 29.0601C53.7782 30.7501 59.4106 27.8578 61.1007 22.5999L42.0601 16.4797ZM110.98 13.6405C112.671 8.38256 109.778 2.75014 104.52 1.06009C99.2624 -0.629953 93.63 2.26237 91.9399 7.52028L110.98 13.6405ZM89.0601 16.4797C87.37 21.7376 90.2624 27.37 95.5203 29.0601C100.778 30.7501 106.411 27.8578 108.101 22.5999L89.0601 16.4797ZM21 34C15.4772 34 11 38.4772 11 44C11 49.5228 15.4772 54 21 54V34ZM120 54C125.523 54 130 49.5228 130 44C130 38.4772 125.523 34 120 34V54ZM10 96C4.47715 96 0 100.477 0 106C0 111.523 4.47715 116 10 116V96ZM109 116C114.523 116 119 111.523 119 106C119 100.477 114.523 96 109 96V116ZM16.9399 125.52L14.0601 134.48L33.1007 140.6L35.9805 131.64L16.9399 125.52ZM66.9399 125.52L64.0601 134.48L83.1007 140.6L85.9805 131.64L66.9399 125.52ZM79.9399 68.5203L77.0601 77.4797L96.1007 83.5999L98.9805 74.6405L79.9399 68.5203ZM28.9399 68.5203L26.0601 77.4797L45.1007 83.5999L47.9805 74.6405L28.9399 68.5203ZM44.9399 7.52028L42.0601 16.4797L61.1007 22.5999L63.9805 13.6405L44.9399 7.52028ZM91.9399 7.52028L89.0601 16.4797L108.101 22.5999L110.98 13.6405L91.9399 7.52028ZM21 54H120V34H21V54ZM10 116H109V96H10V116Z"
              fill="#00000032"
            />
          </svg>
        </label>
        <span className="flex-1 ml-4">
          {n.map((w, i) => (
            <span key={i} className={`${w.c}`}>
              {w.w}
            </span>
          ))}
        </span>
      </div>
    </Transition>
  );
};

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default Index;
