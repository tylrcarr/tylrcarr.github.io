export const calculatePath = (
    startAngle: number,
    endAngle: number,
    radius: number,
    center: number
): string => {
    const radians = (angle: number) => (angle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(radians(startAngle));
    const y1 = center + radius * Math.sin(radians(startAngle));

    const x2 = center + radius * Math.cos(radians(endAngle));
    const y2 = center + radius * Math.sin(radians(endAngle));

    const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
};
