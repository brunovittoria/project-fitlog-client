import * as React from 'react'
import { Input } from '@/components/ui/input'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

export type AutocompleteOption = string | { label: string; value: string }

function getOptionLabel(option: AutocompleteOption) {
  return typeof option === 'string' ? option : option.label
}
function getOptionValue(option: AutocompleteOption) {
  return typeof option === 'string' ? option : option.value
}

export interface AutocompleteInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  options: AutocompleteOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  dropdownClassName?: string
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  inputClassName,
  dropdownClassName,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1)

  const filteredOptions = React.useMemo(() => {
    if (!value) return options
    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(value.toLowerCase()),
    )
  }, [value, options])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true)
      setHighlightedIndex(0)
      return
    }
    if (!filteredOptions.length) return
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0,
      )
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1,
      )
      e.preventDefault()
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        const selected = filteredOptions[highlightedIndex]
        onChange(getOptionLabel(selected))
        setOpen(false)
      }
      e.preventDefault()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    onChange(getOptionLabel(option))
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setOpen(true)
  }

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 100)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setOpen(true)
    setHighlightedIndex(0)
  }

  React.useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.querySelectorAll('[role="option"]')[
        highlightedIndex
      ] as HTMLElement
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex, open])

  return (
    <div className={cn('relative', className)}>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={inputClassName}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="autocomplete-listbox"
        role="combobox"
        {...rest}
      />
      {open && filteredOptions.length > 0 && (
        <div
          ref={listRef}
          id="autocomplete-listbox"
          role="listbox"
          className={cn(
            'bg-popover absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border shadow-lg',
            dropdownClassName,
          )}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <ScrollArea className="max-h-56">
                  {filteredOptions.map((option, idx) => (
                    <CommandItem
                      key={getOptionValue(option)}
                      role="option"
                      aria-selected={highlightedIndex === idx}
                      onSelect={() => handleOptionClick(option)}
                      className={cn(
                        highlightedIndex === idx &&
                          'bg-accent text-accent-foreground',
                      )}
                    >
                      {getOptionLabel(option)}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
      {open && filteredOptions.length === 0 && (
        <div
          className={cn(
            'bg-popover absolute z-10 mt-1 w-full rounded-md border shadow-lg',
            dropdownClassName,
          )}
        >
          <Command>
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
