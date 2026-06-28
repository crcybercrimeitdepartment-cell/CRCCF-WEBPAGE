const fs = require('fs');
const path = require('path');

const mappings = {
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403769/contact_lbu4o9.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782475374/contact_lbu4o9_mfhdel.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403770/focus_z5jjcr.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782475332/focus_z5jjcr_fzuszn.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780381961/Mission_azi7c5.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782475331/Mission_azi7c_zxea2x.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403773/vision_kxgkbv.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782475330/vision_kxgkbv_jnoshv.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779403772/serve_c3m079.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782475330/serve_c3m079_hojxrn.jpg",
  "/pages/skill-development/victory_statue.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472941/victory_statue_dspesv.jpg",
  "/pages/skill-development/lady_justice.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472940/lady_justice_gimkgn.jpg",
  "/pages/skill-development/hanuman_statue.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472939/hanuman_statue_idrylg.jpg",
  "/pages/skill-development/bonsai_tree.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472939/bonsai_tree_ttryo3.jpg",
  "/pages/cyber-awareness/awareness_hero.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472939/awareness_hero_tst4dm.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780406435/career_growth_higvff.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472746/career_growth_higvff_kwldk6.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780406438/career_networking_cpgsta.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472745/career_networking_cpgsta_ynexdx.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780406434/career_achievement_x9ja77.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472745/career_achievement_x9ja77_nmy71x.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780406441/career_practical_wpcklw.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472745/career_practical_wpcklw_rlpphj.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780406441/career_pathways_d6ii9b.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472745/career_pathways_d6ii9b_qrzhge.jpg",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1780406438/career_leadership_irlypr.jpg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782472745/career_leadership_irlypr_b8z9qq.jpg",
  "/door_opening_sound.mp3": "https://res.cloudinary.com/dlhmkbijh/video/upload/v1782471858/door_opening_sound_ct7rrb.mp3",
  "/door_bell.mpeg": "https://res.cloudinary.com/dlhmkbijh/video/upload/v1782471857/door_bell_bls0mt.mp3",
  "/Page_Sound.mp3": "https://res.cloudinary.com/dlhmkbijh/video/upload/v1782471857/Page_Sound_igkonb.mp3",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471833/Logo_iile24_ormcru.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779402399/holographic-padlock_lypzmc.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471811/holographic-padlock_lypzmc_fzczvm.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779402304/cyber-network_jmukxj.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471811/cyber-network_jmukxj_qu3pn5.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779402436/legal-scale_bqsmvs.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471810/legal-scale_bqsmvs_xlb0ah.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779402464/server-room_nmgcaj.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471808/server-room_nmgcaj_fnyphh.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779398594/ai-brain_dv8lbu.png": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471788/ai-brain_dv8lbu_dkxycg.png",
  "https://res.cloudinary.com/dbwnbfdij/image/upload/v1779516223/Logo_iile24.pngg": "https://res.cloudinary.com/dlhmkbijh/image/upload/v1782471833/Logo_iile24_ormcru.png"
};

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.html'];
const ignoredDirs = ['node_modules', '.git', 'dist', 'build'];

function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        walkSync(filepath, callback);
      }
    } else if (stats.isFile()) {
      if (extensions.includes(path.extname(filepath))) {
        callback(filepath);
      }
    }
  });
}

const reports = [];

walkSync(path.join(__dirname, '..'), (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;
  
  for (const [oldUrl, newUrl] of Object.entries(mappings)) {
    if (content.includes(oldUrl)) {
      content = content.split(oldUrl).join(newUrl);
      reports.push({ file: filepath, old: oldUrl, new: newUrl });
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content, 'utf8');
  }
});

fs.writeFileSync(path.join(__dirname, 'report_root.json'), JSON.stringify(reports, null, 2));
console.log(`Replaced in ${reports.length} locations in root. Check report_root.json`);
