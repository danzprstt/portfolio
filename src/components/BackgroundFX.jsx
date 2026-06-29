/**
 * Decorative fixed background: grid pattern + blurred floating orbs.
 * Ported from `.bg-grid` / `.bg-orbs` markup duplicated across every page.
 *
 * @param {string} gridClass - extra class to vary grid color per page
 * @param {string[]} orbClasses - extra classes for each of the 3 orbs
 */
export default function BackgroundFX({ gridClass = '', orbClasses = ['', '', ''] }) {
  return (
    <>
      <div className={`bg-grid ${gridClass}`} />
      <div className="bg-orbs">
        <div className={`orb ${orbClasses[0] || ''}`} />
        <div className={`orb ${orbClasses[1] || ''}`} />
        <div className={`orb ${orbClasses[2] || ''}`} />
      </div>
    </>
  );
}
