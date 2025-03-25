import { Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface TimePickerDemoProps {
  control: Control<any>;
  name: string;
  required?: string;
}

export function TimePickerDemo({
  control,
  name,
  required,
}: TimePickerDemoProps) {
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <div className="flex gap-2">
          <Select
            onValueChange={(hour) => {
              setSelectedHour(hour);
              field.onChange(`${hour}:${selectedMinute || "00"}`);
            }}
            value={selectedHour}
          >
            <SelectTrigger className="w-[110px] bg-white border-gray-200">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {hours.map((hour) => (
                <SelectItem
                  key={hour}
                  value={hour}
                  className="hover:bg-gray-100"
                >
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(minute) => {
              setSelectedMinute(minute);
              field.onChange(`${selectedHour || "00"}:${minute}`);
            }}
            value={selectedMinute}
          >
            <SelectTrigger className="w-[110px] bg-white border-gray-200">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {minutes.map((minute) => (
                <SelectItem
                  key={minute}
                  value={minute}
                  className="hover:bg-gray-100"
                >
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}
