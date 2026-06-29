import { useEffect, useState } from 'react';

/**
 * Typewriter effect cycling through a list of strings, ported from the
 * type() function in portofolio/index.html.
 */
export default function useTypewriter(texts, opts = {}) {
  const { typeSpeed = 75, deleteSpeed = 38, pauseTime = 2200, startDelay = 1100 } = opts;
  const [text, setText] = useState('');

  useEffect(() => {
    let ti = 0, ci = 0, del = false, timer;

    const tick = () => {
      const cur = texts[ti];
      ci = del ? ci - 1 : ci + 1;
      setText(cur.slice(0, ci));
      let sp = del ? deleteSpeed : typeSpeed;
      if (!del && ci === cur.length) { sp = pauseTime; del = true; }
      else if (del && ci === 0) { del = false; ti = (ti + 1) % texts.length; sp = 400; }
      timer = setTimeout(tick, sp);
    };

    const startTimer = setTimeout(tick, startDelay);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
