import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Tag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const tagsString =
      '0.3, <#743482078410047489>, ==, Promise.all, React.FC, \\n, ads, advanced_linux, any, anyone, ask, ask2ask, asking, async, asyncio-loop, begging, beginner_linux, bin, bitshift, bitwise, bitwisebinary, bitwiseunary, bothhtmlcss, byox, careers, cbshort, cflags, challenges, charmath, cheating, clamp, client-mods, code, code.org, codeblocks, cors, country, cppnotc, creationdate, cssgrid, ctfs, d.js, d.py, dapi, date, ddev, deadchat, diy, djs, djslangfirst, dm, dom-listening, editors, english, entitlement, error, error-structure, error500, esm, exercises, exercises-1, exercises-2, exercises-3, experts, express, files, flexbox, float, floating, flutter, fmtcode, foobar, format-js, fp, freelance, freespeech, fspromises, g, gameengines, gettinganswers, googleit, gs, hacking, hammer, headings, help, helpme, homework, hosting, howlong, htmlskeleton, id-class, indent, innerHTML, intents, java, java==, javadebug, javafpdiv, javaide, javajs, javamods, javastatic, javastyle, joindate, joking, jquery, js-foreach, js==, jsasync, jschannel, jserror, jsfiddle, jsondb, justask, justifyalign, jwt, kali, kotlin, langfirstbotlater, language, laravel, largehosting, learnc++, learncs, learnhtmlcss, learnjava, learnjs, learnpython, learnregex, learnrust, lgbtq+, linux, lua, man, memory, memorylinux, memorymacos, memorywindows, modulenotfound, moment.js, multi, mysql, node-gyp, nohello, nojquery, nonavlist, noscreenshots, notmyc, novar, optionresultmap, pastebin, path, patience, playground, projects, pronouns, pyerror, pythonor, react-async, realcode, roblox, roles, scanner, showcase, snowflake, spamdm, spoonfeeding, sqli, startingout, teach2fish, tias, timediff, tinyhosting, tokenleak, topic, truthtable, try, ts-node, tutoring, type=module, typeinterfaces, ub, undefined, unity, usingnamespacestd, vampire, vc, videos, vla, vscdebug, vulgar, w3s, w3schools, wasm, whyts, win7, wsid, x86, xpost, xyproblem, xyz';

    const tagsArr = tagsString.split(', ');
    setExists(tagsArr.includes(tag));

    setLoading(false);
  }, [router.isReady, tag]);

  return loading ? (
    <Loading />
  ) : exists ? (
    <ValidTag tag={tag} />
  ) : (
    <InvalidTag name={tag} />
  );
};

const Loading = () => <div className="text-[100px]">Loading...</div>;

const ValidTag = ({ tag }) => (
  <div className="grid grid-cols-1 gap-4">
    <span className="text-[100px] font-bold underline text-black/40">
      {tag}
    </span>
    <span className="text-[50px] text-black/50">
      Sorry, details are not available
    </span>
    <span className="text-[30px]">
      <a
        className="bg-black/10 py-2 px-4 rounded hover:bg-black/50 transition-all hover:text-white text-white/80 flex"
        href="https://github.com/ig1711/tags-grep"
      >
        <label className="grid grid-cols-1 place-items-center">
          <svg
            width="30"
            height="30"
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
              fill="#f1f1f1"
            />
          </svg>
        </label>
        <span className="flex-1 ml-4">Contribute on Github</span>
      </a>
    </span>
  </div>
);

const InvalidTag = ({ name }) => (
  <div className="grid grid-cols-1 gap-4">
    <span className="text-[100px] underline text-black/40">{name}</span>
    <span className="text-[50px] text-black/70">
      This tag does not exist or is not added
    </span>
    <a
      className="bg-black/10 py-2 px-4 rounded hover:bg-black/50 transition-all hover:text-white text-white/80 flex text-[30px]"
      href="https://github.com/ig1711/tags-grep"
    >
      <label className="grid grid-cols-1 place-items-center">
        <svg
          width="30"
          height="30"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            transform="scale(64)"
            fill="#f1f1f1"
          />
        </svg>
      </label>
      <span className="flex-1 ml-4">Contribute on Github</span>
    </a>
    <a
      className="bg-black/10 py-2 px-4 rounded hover:bg-black/50 transition-all hover:text-white text-white/80 flex text-[30px]"
      href="https://discord.com"
    >
      <label className="grid grid-cols-1 place-items-center">
        <svg
          width="30"
          height="30"
          viewBox="0 0 228 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2_2)">
            <path
              d="M193.308 15.9125C178.536 8.47875 162.741 3.07624 146.228 0C144.2 3.94363 141.831 9.24789 140.197 13.4674C122.644 10.628 105.251 10.628 88.0204 13.4674C86.3872 9.24789 83.9641 3.94363 81.918 0C65.3872 3.07624 49.5743 8.4986 34.8024 15.9518C5.00751 64.3786 -3.06941 111.603 0.969061 158.156C20.7306 174.029 39.882 183.671 58.7101 189.98C63.3589 183.099 67.505 175.784 71.0767 168.074C64.2742 165.294 57.7588 161.863 51.6026 157.88C53.2358 156.579 54.8334 155.218 56.3768 153.818C93.9255 172.708 134.723 172.708 171.823 153.818C173.385 155.218 174.982 156.579 176.597 157.88C170.423 161.883 163.89 165.313 157.087 168.094C160.659 175.784 164.787 183.119 169.454 190C188.3 183.69 207.469 174.049 227.231 158.156C231.969 104.189 219.136 57.3984 193.308 15.9125ZM76.1922 129.526C64.9205 129.526 55.6767 118.208 55.6767 104.425C55.6767 90.6425 64.7231 79.3049 76.1922 79.3049C87.6616 79.3049 96.9051 90.6227 96.7077 104.425C96.7255 118.208 87.6616 129.526 76.1922 129.526ZM152.008 129.526C140.736 129.526 131.492 118.208 131.492 104.425C131.492 90.6425 140.538 79.3049 152.008 79.3049C163.477 79.3049 172.721 90.6227 172.523 104.425C172.523 118.208 163.477 129.526 152.008 129.526Z"
              fill="#f1f1f1"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_2">
              <rect width="228" height="190" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </label>
      <span className="flex-1 ml-4">
        Contact dev on Discord. Usertag: ryo#7634
      </span>
    </a>
  </div>
);

export default Tag;
