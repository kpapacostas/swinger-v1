const FADEDURATION = 700  // this needs to match our css fade animation duration
const MINDELAY = 0      // the minimum delay until the animation begins
const SHORTRANGE = 0    // the delay range until non-selected elements begin their animation
const LONGRANGE = 0     // the delay range until the selected element begins its animation
const LONGESTPOSSIBLE = FADEDURATION + MINDELAY + LONGRANGE // used when transitioning to a new page -- ensures all animations are complete before this one begins
const HOMEPAGE = document.getElementById("header")
const SHOWLIST = document.getElementById("show-display")
