import useSound from "use-sound";

import drawerOpen from "Sounds/drawerOpen.mp3";
import drawerClose from "Sounds/drawerClose.mp3";

import lightsOn from "Sounds/lightsOn.mp3";
import lightsOff from "Sounds/lightsOff.mp3";

import searchMode from "Sounds/searchMode.mp3";
import viewMode from "Sounds/viewMode.mp3";
import favMode from "Sounds/favMode.mp3";

import searchPreInit from "Sounds/searchPreInit.mp3";
import searchInit from "Sounds/searchInit.mp3";

import pikachuSound from "Sounds/pikachu_sound.mp3";
import ghostSound from "Sounds/untitled.mp3";

import favAdded from "Sounds/favAdded.mp3";
import favRemoved from "Sounds/favRemoved.mp3";

const usePlaySound = () => {
  const [playDrawerOpen] = useSound(drawerOpen);
  const [playDrawerClose] = useSound(drawerClose);
  const [playLightsOn] = useSound(lightsOn, { volume: 0.1 });
  const [playLightsOff] = useSound(lightsOff, { volume: 0.1 });

  const [playSearchMode] = useSound(searchMode, { volume: 0.1 });
  const [playViewMode] = useSound(viewMode, { volume: 0.1 });
  const [playFavMode] = useSound(favMode, { volume: 0.1 });

  const [playSearchPreInit] = useSound(searchPreInit, { volume: 0.5 });
  const [playSearchInit] = useSound(searchInit, { volume: 0.025 });

  const [playFaveAdded] = useSound(favAdded, { volume: 0.4 });
  const [playFaveRemoved] = useSound(favRemoved, { volume: 0.4 });

  const [playGhostSound] = useSound(ghostSound);
  const [playPikachuSound] = useSound(pikachuSound, { volume: 0.75 });

  return {
    playDrawerOpen,
    playDrawerClose,
    playLightsOn,
    playLightsOff,
    playSearchMode,
    playViewMode,
    playFavMode,
    playSearchPreInit,
    playSearchInit,
    playFaveAdded,
    playFaveRemoved,
    playPikachuSound,
    playGhostSound,
  };
};

export default usePlaySound;
