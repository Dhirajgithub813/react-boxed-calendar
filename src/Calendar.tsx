import { useState } from "react";

export interface CalendarProps {
  // Modes
  mode?: "single" | "range";

  // Single date selection
  selectedDate?: Date | null;
  onDateChange?: (date: Date) => void;

  // Range selection
  selectedRange?: { start: Date | null; end: Date | null };
  onRangeChange?: (start: Date | null, end: Date | null) => void;

  // Date limits
  minDate?: Date;
  maxDate?: Date;

  // Behavior toggles
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disableWeekends?: boolean;
  disableMonthNav?: boolean;

  // User callback for disabling dates
  isDateDisabled?: (date: Date) => boolean;

  highlightToday?: boolean;
  weekStartsOn?: 0 | 1; // 0 = Sunday, 1 = Monday

  // Localization
  locale?: {
    weekDays?: string[];
    monthNames?: string[];
  };

  // Theme
  theme?: {
    selectedBg?: string;
    selectedText?: string;

    todayBg?: string;
    todayText?: string;

    normalText?: string;
    normalHoverBg?: string;

    disabledBg?: string;
    disabledText?: string;

    borderRadius?: string;
  };

  // Size
  size?: "sm" | "md" | "lg";
}

const Calendar = ({
  mode = "single",
  selectedDate = null,
  onDateChange,

  selectedRange = { start: null, end: null },
  onRangeChange,

  minDate,
  maxDate,

  disablePastDates = false,
  disableFutureDates = false,
  disableWeekends = false,
  disableMonthNav = false,

  isDateDisabled,

  highlightToday = true,
  weekStartsOn = 0,

  locale = {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },

  theme = {
    selectedBg: "bg-blue-600",
    selectedText: "text-white",

    todayBg: "bg-blue-100",
    todayText: "text-blue-600",

    normalText: "text-gray-700",
    normalHoverBg: "hover:bg-gray-200",

    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",

    borderRadius: "rounded-xl",
  },

  size = "md",
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ?? new Date()
  );

  const cellSize =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
      ? "w-14 h-14 text-lg"
      : "w-10 h-10 text-sm"; // md default

  // Helpers
  const sameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isToday = (date: Date) => sameDay(date, new Date());

  const dateIsBefore = (a: Date, b: Date) =>
    a.setHours(0, 0, 0, 0) < b.setHours(0, 0, 0, 0);
  const dateIsAfter = (a: Date, b: Date) =>
    a.setHours(0, 0, 0, 0) > b.setHours(0, 0, 0, 0);

  const shouldDisable = (date: Date) => {
    if (
      disablePastDates &&
      minDate &&
      dateIsBefore(new Date(date), new Date(minDate))
    )
      return true;

    if (
      disableFutureDates &&
      maxDate &&
      dateIsAfter(new Date(date), new Date(maxDate))
    )
      return true;

    if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6))
      return true;

    if (isDateDisabled && isDateDisabled(date)) return true;

    return false;
  };

  const handleSelect = (date: Date) => {
    if (shouldDisable(date)) return;

    if (mode === "single" && onDateChange) {
      onDateChange(date);
    }

    if (mode === "range" && onRangeChange) {
      const { start, end } = selectedRange;

      if (!start || (start && end)) {
        onRangeChange(date, null);
      } else if (start && !end) {
        if (dateIsBefore(new Date(date), new Date(start))) {
          onRangeChange(date, start);
        } else {
          onRangeChange(start, date);
        }
      }
    }
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  // Generate days
  const getDays = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const startOffset = (first.getDay() - weekStartsOn + 7) % 7;
    const days: (Date | null)[] = [];

    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, m, d));

    return days;
  };

  const days = getDays();

  return (
    <div className="p-4 bg-white rounded-2xl shadow border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            ◀
          </button>
        )}

        <h2 className="font-bold text-lg">
          {locale.monthNames![currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h2>

        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            ▶
          </button>
        )}
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {locale.weekDays!.map((d) => (
          <div
            key={d}
            className="text-center font-semibold text-gray-600 text-xs"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={i} className={cellSize} />;

          const disabled = shouldDisable(day);
          const isSelected =
            mode === "single"
              ? sameDay(day, selectedDate)
              : (selectedRange.start && sameDay(day, selectedRange.start)) ||
                (selectedRange.end && sameDay(day, selectedRange.end));

          const isInRange =
            mode === "range" &&
            selectedRange.start &&
            selectedRange.end &&
            dateIsAfter(day, selectedRange.start) &&
            dateIsBefore(day, selectedRange.end);

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => handleSelect(day)}
              className={[
                "flex items-center justify-center transition-all",
                cellSize,
                theme.borderRadius,

                disabled
                  ? `${theme.disabledBg} ${theme.disabledText}`
                  : isSelected
                  ? `${theme.selectedBg} ${theme.selectedText} scale-105 shadow`
                  : isToday(day) && highlightToday
                  ? `${theme.todayBg} ${theme.todayText}`
                  : isInRange
                  ? "bg-blue-50 text-blue-600"
                  : `${theme.normalText} ${theme.normalHoverBg}`,
              ].join(" ")}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
