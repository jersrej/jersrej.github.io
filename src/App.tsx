import { lazy, Suspense, useCallback, useState } from 'react';
import { buildCommands } from './commands';
import { CommandPalette } from './components/CommandPalette';
import { DeckView } from './components/DeckView';
import { Header } from './components/Header';
import { PageView } from './components/PageView';
import { ShortcutsDialog } from './components/ShortcutsDialog';
import { SkipToContent } from './components/SkipToContent';
import { steps } from './data/deck';
import { useDeck } from './hooks/useDeck';
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';
import { useViewMode } from './hooks/useViewMode';

const BugHunter = lazy(() => import('./components/BugHunter'));

type Overlay = 'palette' | 'shortcuts' | 'game';

export default function App() {
  const { index, go, step } = useDeck();
  const { mode, setMode } = useViewMode();
  const { theme, cycleTheme } = useTheme();
  const sound = useSound();
  // Never persisted: auto play only ever starts from the visitor's click
  const [autoPlay, setAutoPlay] = useState(false);
  const stopAutoPlay = useCallback(() => setAutoPlay(false), []);

  // One overlay at a time. Closing is keyed by name because a dialog's close
  // event can arrive after another overlay has already taken its place.
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const close = (name: Overlay) => () => setOverlay((o) => (o === name ? null : o));
  const togglePalette = useCallback(
    () => setOverlay((o) => (o === 'palette' ? null : 'palette')),
    []
  );
  const openShortcuts = useCallback(() => setOverlay('shortcuts'), []);
  const openGame = useCallback(() => setOverlay('game'), []);

  useGlobalShortcuts({ onTogglePalette: togglePalette, onOpenShortcuts: openShortcuts });
  useKonamiCode(openGame);

  const toggleAutoPlay = () => {
    // Starting from the last slide replays the deck from the top
    if (!autoPlay && index === steps.length - 1) go(0);
    setAutoPlay(!autoPlay);
  };

  const toggleMode = () => {
    setAutoPlay(false);
    setMode(mode === 'deck' ? 'page' : 'deck');
  };

  const commands = buildCommands({
    mode,
    theme,
    autoPlay,
    sound: sound.enabled,
    step,
    toggleAutoPlay,
    toggleSound: sound.toggle,
    toggleMode,
    cycleTheme,
    openShortcuts,
    openGame
  });

  return (
    <div
      className={`bg-paper text-ink ${
        mode === 'deck'
          ? 'grid h-dvh grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto]'
          : 'min-h-dvh'
      }`}
    >
      <SkipToContent />
      <Header
        section={steps[index].section}
        mode={mode}
        onModeToggle={toggleMode}
        theme={theme}
        onThemeCycle={cycleTheme}
        autoPlay={autoPlay}
        onAutoPlayToggle={toggleAutoPlay}
        sound={sound.enabled}
        onSoundToggle={sound.toggle}
        onOpenPalette={togglePalette}
      />

      {mode === 'deck' ? (
        <DeckView
          index={index}
          go={go}
          step={step}
          // Slides hold still while a dialog is open
          autoPlay={autoPlay && !overlay}
          onAutoPlayEnd={stopAutoPlay}
          sound={sound.enabled}
          onOpenShortcuts={openShortcuts}
        />
      ) : (
        <PageView index={index} go={go} />
      )}

      <CommandPalette open={overlay === 'palette'} onClose={close('palette')} commands={commands} />
      <ShortcutsDialog open={overlay === 'shortcuts'} onClose={close('shortcuts')} mode={mode} />
      {overlay === 'game' && (
        <Suspense fallback={null}>
          <BugHunter open onClose={close('game')} sound={sound.enabled} />
        </Suspense>
      )}
    </div>
  );
}
