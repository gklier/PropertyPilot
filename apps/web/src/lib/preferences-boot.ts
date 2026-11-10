/** Runs before first paint so the stored table density applies without a flash. Key matches preferences.ts. */
export const densityBootScript = `try{if(localStorage.getItem("pp-density")==="compact")document.documentElement.dataset.density="compact"}catch(e){}`;
