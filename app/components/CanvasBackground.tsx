type CanvasBackgroundProps = {
    sketch: string;
    sketchUrl: string;
    title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CanvasBackground: React.FC<CanvasBackgroundProps> = function CanvasBackground({
    sketch,
    sketchUrl,
    title,
    children,
}) {
    return (
        <div className="relative">
            {sketch && (
                <iframe
                    className="absolute z-[-1] w-full min-h-screen"
                    src={sketchUrl}
                    srcDoc={sketch}
                    title={title}
                />
            )}

            {children}
        </div>
    );
};

export default CanvasBackground;
