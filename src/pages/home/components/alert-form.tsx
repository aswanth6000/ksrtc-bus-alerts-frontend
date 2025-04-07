import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TimePickerDemo } from "./time-picker";
import { useCreateAlert } from "@/services/create-alert/use-create-alert";

interface AlertFormData {
  email: string;
  searchUrl: string;
  timeRangeStart: string;
  timeRangeEnd: string;
}

export function AlertForm() {
  const { mutate: createAlert, isPending } = useCreateAlert();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AlertFormData>({
    defaultValues: {
      email: "",
      searchUrl: "",
      timeRangeStart: "",
      timeRangeEnd: "",
    },
  });

  const onSubmit = async (data: AlertFormData) => {
    createAlert(data);
    
  };

  return (
    <Card className="w-full max-w-md my-2 mx-auto">
      <CardHeader>
        <CardTitle>Create KSRTC Bus Alert</CardTitle>
        <CardDescription>
          Set up an alert to notify you when bus tickets become available
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-2">
            <div>
              <Label htmlFor="email">Email</Label>
            </div>
            <Input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <Label htmlFor="searchUrl">Search URL</Label>
              <p className="text-xs text-muted-foreground text-start mt-1">
                Click{" "}
                <a href="/how-to-use" target="_blank" className="underline">
                  here
                </a>{" "}
                to see how to get search URL
              </p>
            </div>
            <Input
              id="searchUrl"
              {...register("searchUrl", {
                required: "Search URL is required",
                pattern: {
                  value:
                    /^https?:\/\/onlineksrtcswift\.com\/search\?.*fromCity=.*&toCity=.*&departDate=.*&mode=oneway.*$/i,
                  message: "Please enter a valid KSRTC search URL",
                },
                validate: {
                  hasRequiredParams: (value) => {
                    try {
                      const url = new URL(value);
                      const requiredParams = [
                        "fromCity",
                        "toCity",
                        "departDate",
                        "mode",
                      ];
                      return (
                        requiredParams.every((param) =>
                          url.searchParams.has(param)
                        ) ||
                        "URL must contain fromCity, toCity, departDate, and mode parameters"
                      );
                    } catch {
                      return "Invalid URL format";
                    }
                  },
                },
              })}
              placeholder="Enter the KSRTC search URL"
            />
            {errors.searchUrl && (
              <p className="text-xs text-red-500 mt-1">
                {errors.searchUrl.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-3">
              <div>
                <Label htmlFor="timeRangeStart">Start Time</Label>
                <p className="text-xs text-muted-foreground text-start mt-1">
                  The start time range that you are planning to book the ticket
                </p>
              </div>
              <TimePickerDemo
                control={control}
                name="timeRangeStart"
                required="Start time is required"
              />
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="timeRangeEnd">End Time</Label>
                <p className="text-xs text-muted-foreground text-start mt-1">
                  The end time range that you are planning to book the ticket
                </p>
              </div>
              <TimePickerDemo
                control={control}
                name="timeRangeEnd"
                required="End time is required"
              />
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending ? "Creating Alert..." : "Create Alert"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
