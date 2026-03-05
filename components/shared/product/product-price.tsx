import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // Ensure two decimal places
  const fixedValue = value.toFixed(2);
  // Get two values
  const [intValue, floatValue] = fixedValue.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super underline">{floatValue}</span>
    </p>
  );
};
export default ProductPrice;
