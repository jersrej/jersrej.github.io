import type { CSSProperties } from 'react';
import { artUrl, poses, type Pose } from '../data/idleSprites';

/** One frame of a pose's strip, sized by --idle-k (strip pixels to CSS px, see styles.css) */
export const IdleArt = ({ pose, frame }: { pose: Pose; frame: number }) => {
  const { frames, width, height } = poses[pose];
  const style = {
    '--w': width,
    '--h': height,
    backgroundImage: `url(${artUrl(pose)})`,
    backgroundSize: `${frames * 100}% 100%`,
    backgroundPosition: `${frames > 1 ? (frame / (frames - 1)) * 100 : 0}% 0`
  } as CSSProperties;
  return <div className="idle-art" style={style} />;
};
