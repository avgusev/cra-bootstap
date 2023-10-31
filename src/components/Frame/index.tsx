import { IframeHTMLAttributes } from 'react';

type frameProps = IframeHTMLAttributes<HTMLIFrameElement>;

function Frame({
  style,
  title = '',
  id = 'frame',
  seamless = true,
  loading = 'lazy',
  sandbox = 'allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads',
  ...props
}: frameProps) {
  // const [topHeight, setTopHeight] = useState(0);

  // const frameRef = useCallback((node: HTMLIFrameElement) => {
  //   if (node !== null) setTopHeight(node.getBoundingClientRect().top);
  // }, []);

  const defaultStyle = {
    width: '100%',
    // height: `calc(100vh - ${topHeight}px)`,
    height: 'calc(100vh - 6px)',
  };

  return (
    <iframe
      // ref={frameRef}
      style={{ ...defaultStyle, ...style }}
      title={title}
      id={id}
      seamless={seamless}
      loading={loading}
      sandbox={sandbox}
      {...props}
    >
      {/*Ваш браузер не поддерживает плавающие фреймы.*/}
    </iframe>
  );
}

export default Frame;
