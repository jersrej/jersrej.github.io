import { Search } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import type { Command } from '../commands';
import { Dialog } from './Dialog';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

const matches = (command: Command, query: string) =>
  `${command.group} ${command.label} ${command.keywords ?? ''}`.toLowerCase().includes(query);

const CommandList = ({ commands, onClose }: Omit<CommandPaletteProps, 'open'>) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = commands.filter((c) => matches(c, query.trim().toLowerCase()));
  const active = results[Math.min(activeIndex, results.length - 1)];

  const run = (command: Command) => {
    onClose();
    command.run();
  };

  const move = (delta: number) => {
    if (!results.length) return;
    const next = (results.indexOf(active) + delta + results.length) % results.length;
    setActiveIndex(next);
    document.getElementById(`command-${results[next].id}`)?.scrollIntoView({ block: 'nearest' });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') move(1);
    else if (e.key === 'ArrowUp') move(-1);
    else if (e.key === 'Enter' && active) run(active);
    else return;
    e.preventDefault();
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={active ? `command-${active.id}` : undefined}
          aria-label="Search commands"
          placeholder="Type a command…"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          // The whole dialog is the focus indicator here
          className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
        />
        <kbd className="kbd max-sm:hidden">esc</kbd>
      </div>

      <ul
        id="command-list"
        role="listbox"
        aria-label="Commands"
        className="max-h-[min(24rem,55svh)] overflow-y-auto p-2"
      >
        {results.map((command, i) => {
          const Icon = command.icon;
          const isActive = command === active;
          const startsGroup = command.group !== results[i - 1]?.group;
          return (
            <li key={command.id} role="presentation">
              {startsGroup && (
                <p className="eyebrow px-2 pt-3 pb-1.5" role="presentation">
                  {command.group}
                </p>
              )}
              <div
                id={`command-${command.id}`}
                role="option"
                aria-selected={isActive}
                onClick={() => run(command)}
                onPointerMove={() => setActiveIndex(i)}
                className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm ${
                  isActive ? 'bg-paper text-ink' : 'text-muted'
                }`}
              >
                <Icon className={`size-4 shrink-0 ${isActive ? 'text-accent' : ''}`} />
                <span className="flex-1">{command.label}</span>
                {command.hint && <kbd className="kbd">{command.hint}</kbd>}
              </div>
            </li>
          );
        })}
        {!results.length && (
          <li className="px-2 py-6 text-center text-sm text-muted">No matching commands</li>
        )}
      </ul>
    </div>
  );
};

export const CommandPalette = ({ open, onClose, commands }: CommandPaletteProps) => (
  <Dialog open={open} onClose={onClose} label="Command palette" className="mt-[12svh]">
    <CommandList commands={commands} onClose={onClose} />
  </Dialog>
);
