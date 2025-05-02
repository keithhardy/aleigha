import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioGroupComponentProps {
  onChange: (value: string) => void;
  value: string;
}

export const RadioGroupComponent = ({ onChange, value }: RadioGroupComponentProps) => {
  return (
    <RadioGroup onValueChange={onChange} value={value} className="grid grid-cols-4 gap-4">
      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="ok" />
        </FormControl>
        <FormLabel className="font-normal">OK</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="c1" />
        </FormControl>
        <FormLabel className="font-normal">C1</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="c2" />
        </FormControl>
        <FormLabel className="font-normal">C2</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="c3" />
        </FormControl>
        <FormLabel className="font-normal">C3</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="na" />
        </FormControl>
        <FormLabel className="font-normal">N/A</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="lim" />
        </FormControl>
        <FormLabel className="font-normal">LIM</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="fi" />
        </FormControl>
        <FormLabel className="font-normal">FI</FormLabel>
      </FormItem>

      <FormItem className="flex items-end space-x-2">
        <FormControl>
          <RadioGroupItem value="r" />
        </FormControl>
        <FormLabel className="font-normal">R</FormLabel>
      </FormItem>
    </RadioGroup>
  );
};
