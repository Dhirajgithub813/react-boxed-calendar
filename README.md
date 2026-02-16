# React Boxed Calendar

A highly customizable, flexible React calendar component with single and range date selection modes, built with TypeScript and Tailwind CSS.

![npm version](https://img.shields.io/npm/v/react-boxed-calendar)
![npm downloads](https://img.shields.io/npm/dm/react-boxed-calendar)
![license](https://img.shields.io/npm/l/react-boxed-calendar)

## Features

- 📅 **Single date and date range selection modes**
- 🎨 **6 Built-in themes** - Light, Dark, Metallic, Cyberpunk, Retro, Nature
- 🖌️ **Fully customizable theming** using Tailwind CSS classes
- 🔒 **Flexible date disabling** - past/future dates, weekends, specific weekdays, or custom logic
- 🎉 **Holiday support** with customizable highlight colors
- 📆 **Weekday OFF feature** - mark recurring weekly holidays with custom styling
- 🌍 **Full locale support** for weekdays and month names
- 📱 **Responsive sizes** (sm, md, lg) with custom size support
- 🗓️ **Month & Year picker panels** for quick navigation
- ♿ **Accessibility-friendly** with ARIA attributes
- 💪 **Written in TypeScript** with full type support
- 🎯 **Zero external dependencies** (except React and Tailwind CSS)

## Installation

```bash
npm install react-boxed-calendar
```

Make sure you have Tailwind CSS configured in your project. If not, follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

## Usage

### Basic Example (Single Date Selection)

```tsx
import { useState } from "react";
import { Calendar } from "react-boxed-calendar";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Calendar
      mode="single"
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
}
```

### Date Range Selection

```tsx
import { useState } from "react";
import { Calendar } from "react-boxed-calendar";

function App() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setRange({ start, end });
  };

  return (
    <Calendar
      mode="range"
      selectedRange={range}
      onRangeChange={handleRangeChange}
    />
  );
}
```

### Using Built-in Themes

```tsx
<Calendar
  themeName="cyberpunk" // "light" | "dark" | "metallic" | "cyberpunk" | "retro" | "nature"
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
/>
```

### Holiday Highlighting

```tsx
<Calendar
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  holidays={[
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 0, 1), // New Year
    new Date(2024, 6, 4), // Independence Day
  ]}
  holidayColor={{
    bg: "bg-red-100",
    text: "text-red-700",
    hoverBg: "hover:bg-red-200",
  }}
/>
```

### Weekday OFF (Mark Weekly Holidays)

```tsx
<Calendar
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  weekdayOFF={[0, 6]} // Mark Sunday (0) and Saturday (6) as weekly off/holidays
  weekdayOFFColor={{
    bg: "bg-gray-100",
    text: "text-gray-500",
    hoverBg: "hover:bg-gray-200",
  }}
/>
```

### Custom Sizing

```tsx
<Calendar
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  customSize={{
    box: 400, // Container width/height in pixels
    cell: 48, // Individual cell size in pixels
    gap: 8, // Gap between cells in pixels
  }}
/>
```

### Advanced Configuration

```tsx
<Calendar
  mode="single"
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  disablePastDates={true}
  disableWeekends={true}
  highlightToday={true}
  weekStartsOn={1} // Monday
  size="lg"
  themeName="dark"
  theme={{
    // Override specific theme properties
    selectedBg: "bg-purple-600",
    selectedText: "text-white",
  }}
  locale={{
    weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  }}
/>
```

## Props

### Selection Props

| Prop            | Type                                               | Default                      | Description                                  |
| --------------- | -------------------------------------------------- | ---------------------------- | -------------------------------------------- |
| `mode`          | `"single" \| "range"`                              | `"single"`                   | Selection mode                               |
| `selectedDate`  | `Date \| null`                                     | `null`                       | Currently selected date (single mode)        |
| `onDateChange`  | `(date: Date) => void`                             | -                            | Callback when date is selected (single mode) |
| `selectedRange` | `{ start: Date \| null; end: Date \| null }`       | `{ start: null, end: null }` | Selected date range (range mode)             |
| `onRangeChange` | `(start: Date \| null, end: Date \| null) => void` | -                            | Callback when range is selected (range mode) |

### Date Constraint Props

| Prop                 | Type                      | Default | Description                               |
| -------------------- | ------------------------- | ------- | ----------------------------------------- |
| `minDate`            | `Date`                    | -       | Minimum selectable date                   |
| `maxDate`            | `Date`                    | -       | Maximum selectable date                   |
| `disablePastDates`   | `boolean`                 | `false` | Disable all past dates                    |
| `disableFutureDates` | `boolean`                 | `false` | Disable all future dates                  |
| `disableWeekends`    | `boolean`                 | `false` | Disable weekends (Sat & Sun)              |
| `isDateDisabled`     | `(date: Date) => boolean` | -       | Custom function to disable specific dates |

### Holiday & Weekday OFF Props

| Prop              | Type                                               | Default                                                                      | Description                                          |
| ----------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| `holidays`        | `Date[]`                                           | `[]`                                                                         | Array of holiday dates to highlight                  |
| `holidayColor`    | `{ bg?: string; text?: string; hoverBg?: string }` | `{ bg: "bg-red-100", text: "text-red-700", hoverBg: "hover:bg-red-200" }`    | Custom colors for holiday dates                      |
| `weekdayOFF`      | `number[]`                                         | `[]`                                                                         | Array of weekday indices to mark as weekly off (0-6) |
| `weekdayOFFColor` | `{ bg?: string; text?: string; hoverBg?: string }` | `{ bg: "bg-gray-100", text: "text-gray-500", hoverBg: "hover:bg-gray-200" }` | Custom colors for weekly off days                    |

### Display & Navigation Props

| Prop              | Type      | Default | Description                          |
| ----------------- | --------- | ------- | ------------------------------------ |
| `highlightToday`  | `boolean` | `true`  | Highlight today's date               |
| `weekStartsOn`    | `0 \| 1`  | `0`     | Week start day (0=Sunday, 1=Monday)  |
| `disableMonthNav` | `boolean` | `false` | Disable month/year navigation panels |

### Theming & Sizing Props

| Prop         | Type                                                                    | Default   | Description                                   |
| ------------ | ----------------------------------------------------------------------- | --------- | --------------------------------------------- |
| `themeName`  | `"light" \| "dark" \| "metallic" \| "cyberpunk" \| "retro" \| "nature"` | `"light"` | Built-in theme preset                         |
| `theme`      | `CalendarTheme`                                                         | -         | Custom theme configuration (overrides preset) |
| `size`       | `"sm" \| "md" \| "lg"`                                                  | `"md"`    | Calendar size preset                          |
| `customSize` | `{ box?: number; cell?: number; gap?: number }`                         | -         | Custom pixel sizes for fine-grained control   |
| `locale`     | `CalendarLocale`                                                        | -         | Custom locale for weekdays and month names    |

## Built-in Themes

The calendar comes with 6 beautiful built-in themes:

| Theme       | Description                          |
| ----------- | ------------------------------------ |
| `light`     | Clean, minimal light theme (default) |
| `dark`      | Sleek dark mode theme                |
| `metallic`  | Modern metallic/silver appearance    |
| `cyberpunk` | Futuristic neon-inspired theme       |
| `retro`     | Vintage, nostalgic color palette     |
| `nature`    | Earthy, organic green tones          |

## Theme Customization

The `theme` prop accepts an object with the following Tailwind CSS class strings:

```typescript
interface CalendarTheme {
  containerBg?: string; // Background for the calendar container
  containerBorder?: string; // Border color for the container
  selectedBg?: string; // Background for selected dates
  selectedText?: string; // Text color for selected dates
  todayBg?: string; // Background for today
  todayText?: string; // Text color for today
  normalText?: string; // Text color for normal dates
  normalHoverBg?: string; // Hover background for normal dates
  disabledBg?: string; // Background for disabled dates
  disabledText?: string; // Text color for disabled dates
  borderRadius?: string; // Border radius for date cells
}
```

### Example: Custom Theme

```tsx
<Calendar
  theme={{
    containerBg: "bg-slate-900",
    containerBorder: "border-slate-700",
    selectedBg: "bg-emerald-500",
    selectedText: "text-white",
    todayBg: "bg-emerald-900",
    todayText: "text-emerald-300",
    normalText: "text-slate-200",
    normalHoverBg: "hover:bg-slate-800",
    disabledBg: "bg-slate-800",
    disabledText: "text-slate-600",
    borderRadius: "rounded-lg",
  }}
/>
```

## Locale Customization

Customize weekday and month names for internationalization:

```typescript
interface CalendarLocale {
  weekDays?: [string, string, string, string, string, string, string];
  monthNames?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}
```

### Example: Spanish Locale

```tsx
<Calendar
  locale={{
    weekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  }}
/>
```

## Custom Date Disabling

Disable specific dates using the `isDateDisabled` callback:

```tsx
<Calendar
  isDateDisabled={(date) => {
    // Disable dates falling on the 13th of any month
    return date.getDate() === 13;
  }}
/>
```

### Combining Multiple Disable Conditions

```tsx
<Calendar
  disablePastDates={true}
  disableWeekends={true}
  weekdayOFF={[3]} // Mark Wednesdays as weekly off
  holidays={[new Date(2024, 11, 25)]}
  isDateDisabled={(date) => {
    // Additional custom logic
    return date.getDate() === 13;
  }}
/>
```

## Size Reference

| Size | Cell Dimensions | Best For                |
| ---- | --------------- | ----------------------- |
| `sm` | 32x32px         | Compact spaces, mobile  |
| `md` | 40x40px         | Standard usage          |
| `lg` | 56x56px         | Desktop, touch-friendly |

## TypeScript Support

The package is written in TypeScript and exports all necessary types:

```tsx
import { Calendar } from "react-boxed-calendar";
import type {
  CalendarProps,
  CalendarTheme,
  CalendarLocale,
} from "react-boxed-calendar";
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Follow [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/Durgeshwar-AI/react-boxed-calendar/issues).
