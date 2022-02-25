import { useEffect, useRef, forwardRef, useState, useContext } from 'react';
import { Transition } from '@headlessui/react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';

import ColorPalletteContext from '../contexts/colorPallette';
import AnimationContext from '../contexts/animation';

const tagsString =
  '0.3, <#743482078410047489>, ==, Promise.all, React.FC, \\n, ads, advanced_linux, advertising, anyone, ask, ask2ask, asking, async, asyncio-loop, beginner_linux, bin, bitshift, bitwise, bitwisebinary, bitwiseunary, bots, byox, careers, cb, cbshort, cflags, challenges, charmath, cheating, clamp, client-mods, code, codeblocks, codesnippetjs, codesnippetpython, country, cppnotc, creationdate, crosspost, cssgrid, cssonly, ctfs, d.js, d.py, date, ddev, deadchat, discouraged-topics, diy, djslangfirst, dm, dom-listening, editors, english, entitlement, error, error-structure, error500, esm, exercises, express, fastify, files, flexbox, float, floating, flutter, fmtcode, foobar, fp, freelance, g, gameengines, gettinganswers, googleit, gs, hacking, hammer, headings, help, helpme, homework, hosting, html, htmlonly, htmlskeleton, id-class, indent, innerHTML, intents, java, java==, javadebug, javaide, javajs, javamod, javastatic, joindate, joking, jquery, js_async, jschannel, jserror, jsfiddle, jsondb, justask, justifyalign, kali, kotlin, langfirstbotlater, language, laravel, largehosting, learnc++, learncs, learncsharp, learnjava, learnjs, learnpython, learnregex, learnrust, linux, lua, man, memory, memorylinux, memorymacos, memorywindows, moment.js, multi, mysql, nevar, node-gyp, nohello, nojquery, nonavlist, noscreenshots, notmyc, novar, on*, optionresultmap, pastebin, path, patience, playground, projects, react-async, roblox, roles, scanner, showcase, spamdm, spoonfeeding, sqli, startingout, teach2fish, tias, timediff, tinyhosting, tokenleak, topic, truthtable, try, tutoring, type=module, typeinterfaces, ub, undefined, unity, vampire, var, vc, videos, vscdebug, vulgar, w3s, w3schools, which-js, whyts, win7, wsid, x86, xpost, xyproblem, xyz';

const tags = tagsString.split(', ');

const Index = () => {
  const colorPallette = useContext(ColorPalletteContext);
  const { setAnimation } = useContext(AnimationContext);
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [up, setUp] = useState(false);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Auto focus
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => setIsMobile(window.innerWidth < 768), []);

  // Debounce
  useEffect(() => {
    // More debounce for phones
    const timer = setTimeout(() => setQuery(value), isMobile ? 500 : 100);
    return () => {
      clearTimeout(timer);
    };
  }, [value, isMobile]);

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
    const reg = new RegExp(escapeRegExp(query), 'i');
    const a = tags
      .map(
        m =>
          m.match(reg) && {
            m: m.match(reg)[0],
            sa: m.split(m.match(reg)[0]),
            i: m.match(reg).index,
            word: m,
          }
      )
      .filter(f => !!f)
      .sort((a, b) => a.i > b.i)
      .map(p => {
        const temp = [];
        p.sa.forEach((s, i) => {
          temp.push({ w: s, c: '' });
          if (i + 1 < p.sa.length) temp.push({ w: p.m, c: 'text-red-400' });
        });
        return { word: p.word, arr: temp };
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
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/760031614389452841/943244484437770321/tcdlogo.png"
        />
        <meta property="og:description" content="Search TCD tags" />
        <meta property="og:site_name" content="TCD Tags" />
        <meta name="theme-color" content="#ff006a" />
      </Head>
      <div
        className={`${
          up ? 'translate-y-[10vh]' : 'translate-y-[40vh]'
        } grid grid-columns-1 gap-2 transition-all duration-700 ease-in-out`}
      >
        <form
          className={`w-[26rem] md:w-[32rem] ${colorPallette[3]} flex py-2 px-4`}
          onSubmit={e => {
            e.preventDefault();
            if (['animation', 'animate'].includes(query.toLowerCase()))
              setAnimation(a => !a), setValue('');
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
            onInput={e => setValue(e.target.value)}
            spellCheck={false}
            className={`flex-1 w-full font-fira ${colorPallette[0]} text-[2rem] ${colorPallette[7]} bg-transparent h-14 focus:outline-none ml-4`}
          />
        </form>

        <div
          style={{ scrollbarWidth: 'none' }}
          className={`${styles.scroll} focus:outline-none w-[26rem] md:w-[32rem] max-h-[60vh] overflow-y-scroll grid grid-columns-1 content-start gap-2`}
        >
          {up && !results.length ? (
            <ListItem
              arr={[{ w: 'No tags found', c: '' }]}
              show={!!query && up}
              current={colorPallette}
              x={true}
            />
          ) : (
            results.map((item, i) => (
              <ListItem
                key={i}
                arr={item.arr}
                show={!!query && up}
                current={colorPallette}
                word={item.word}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

const InnerListItemContent = forwardRef(({ href, onClick, arr, current, x }, ref) => {

  const handleClick = (e, ...args) => {
    onClick ? onClick(e, ...args) : e.preventDefault()
  }

  return (
    <a href={href} onClick={handleClick} ref={ref}
      className={`text-[2rem] font-fira ${current[6]} ${current[5]} rounded-md py-2 px-4 flex focus:bg-white focus:outline-none`}
    >
      <label className="grid grid-columns-1 place-items-center">
        {x ? (
          <svg
            width="24"
            height="30"
            viewBox="0 0 120 125"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.2132 3.92893C13.308 0.0236894 6.97631 0.0236896 3.07107 3.92893C-0.834176 7.83418 -0.834176 14.1658 3.07107 18.0711L17.2132 3.92893ZM102.929 117.929C106.834 121.834 113.166 121.834 117.071 117.929C120.976 114.024 120.976 107.692 117.071 103.787L102.929 117.929ZM50.0711 89.2132C53.9763 85.308 53.9763 78.9763 50.0711 75.0711C46.1658 71.1658 39.8342 71.1658 35.9289 75.0711L50.0711 89.2132ZM3.07107 107.929C-0.834177 111.834 -0.834177 118.166 3.07107 122.071C6.97631 125.976 13.308 125.976 17.2132 122.071L3.07107 107.929ZM117.071 17.2132C120.976 13.308 120.976 6.97631 117.071 3.07107C113.166 -0.834175 106.834 -0.834175 102.929 3.07107L117.071 17.2132ZM70.0711 35.9289C66.1658 39.8342 66.1658 46.1658 70.0711 50.0711C73.9763 53.9763 80.308 53.9763 84.2132 50.0711L70.0711 35.9289ZM3.07107 18.0711L102.929 117.929L117.071 103.787L17.2132 3.92893L3.07107 18.0711ZM35.9289 75.0711L3.07107 107.929L17.2132 122.071L50.0711 89.2132L35.9289 75.0711ZM102.929 3.07107L70.0711 35.9289L84.2132 50.0711L117.071 17.2132L102.929 3.07107Z"
              fill={current[8]}
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="30"
            viewBox="0 0 130 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.9805 131.64C37.6705 126.383 34.7782 120.75 29.5203 119.06C24.2624 117.37 18.63 120.262 16.9399 125.52L35.9805 131.64ZM14.0601 134.48C12.37 139.738 15.2624 145.37 20.5203 147.06C25.7782 148.75 31.4106 145.858 33.1007 140.6L14.0601 134.48ZM85.9805 131.64C87.6705 126.383 84.7782 120.75 79.5203 119.06C74.2624 117.37 68.63 120.262 66.9399 125.52L85.9805 131.64ZM64.0601 134.48C62.37 139.738 65.2624 145.37 70.5203 147.06C75.7782 148.75 81.4106 145.858 83.1007 140.6L64.0601 134.48ZM98.9805 74.6405C100.671 69.3826 97.7782 63.7501 92.5203 62.0601C87.2624 60.37 81.63 63.2624 79.9399 68.5203L98.9805 74.6405ZM77.0601 77.4797C75.37 82.7376 78.2624 88.37 83.5203 90.0601C88.7782 91.7501 94.4106 88.8578 96.1007 83.5999L77.0601 77.4797ZM47.9805 74.6405C49.6705 69.3826 46.7782 63.7501 41.5203 62.0601C36.2624 60.37 30.63 63.2624 28.9399 68.5203L47.9805 74.6405ZM26.0601 77.4797C24.37 82.7376 27.2624 88.37 32.5203 90.0601C37.7782 91.7501 43.4106 88.8578 45.1007 83.5999L26.0601 77.4797ZM63.9805 13.6405C65.6705 8.38256 62.7782 2.75013 57.5203 1.06009C52.2624 -0.629952 46.63 2.26237 44.9399 7.52028L63.9805 13.6405ZM42.0601 16.4797C40.37 21.7376 43.2624 27.37 48.5203 29.0601C53.7782 30.7501 59.4106 27.8578 61.1007 22.5999L42.0601 16.4797ZM110.98 13.6405C112.671 8.38256 109.778 2.75014 104.52 1.06009C99.2624 -0.629953 93.63 2.26237 91.9399 7.52028L110.98 13.6405ZM89.0601 16.4797C87.37 21.7376 90.2624 27.37 95.5203 29.0601C100.778 30.7501 106.411 27.8578 108.101 22.5999L89.0601 16.4797ZM21 34C15.4772 34 11 38.4772 11 44C11 49.5228 15.4772 54 21 54V34ZM120 54C125.523 54 130 49.5228 130 44C130 38.4772 125.523 34 120 34V54ZM10 96C4.47715 96 0 100.477 0 106C0 111.523 4.47715 116 10 116V96ZM109 116C114.523 116 119 111.523 119 106C119 100.477 114.523 96 109 96V116ZM16.9399 125.52L14.0601 134.48L33.1007 140.6L35.9805 131.64L16.9399 125.52ZM66.9399 125.52L64.0601 134.48L83.1007 140.6L85.9805 131.64L66.9399 125.52ZM79.9399 68.5203L77.0601 77.4797L96.1007 83.5999L98.9805 74.6405L79.9399 68.5203ZM28.9399 68.5203L26.0601 77.4797L45.1007 83.5999L47.9805 74.6405L28.9399 68.5203ZM44.9399 7.52028L42.0601 16.4797L61.1007 22.5999L63.9805 13.6405L44.9399 7.52028ZM91.9399 7.52028L89.0601 16.4797L108.101 22.5999L110.98 13.6405L91.9399 7.52028ZM21 54H120V34H21V54ZM10 116H109V96H10V116Z"
              fill={current[8]}
            />
          </svg>
        )}
      </label>
      <span className="flex-1 ml-4">
        {arr.map((w, i) => (
          <span key={i} className={`${w.c}`}>
            {w.w}
          </span>
        ))}
      </span>
    </a>
  )
})

const ListItem = ({ arr, show, current, word, x }) => {
  return (
    <Transition
      as={'a'}
      show={show}
      enter={`transition-opacity duration-1000`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-400"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      unmount={true}
    >
      {word ? (
        <Link href={`/${word}`} passHref>
          <InnerListItemContent arr={arr} current={current} x={x} /> 
        </Link>
      ) : (
        <InnerListItemContent arr={arr} current={current} x={x} /> 
      )}
    </Transition>
  );
};

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default Index;
