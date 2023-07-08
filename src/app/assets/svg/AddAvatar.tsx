import { ISvgProps } from '#types/svgProps';

export const AddAvatar: React.ComponentType<ISvgProps> = ({ width = 36, height = 36 }) => (
  <svg
    height={height}
    viewBox="0 0 24 24"
    width={width}
  >
    <g>
      <path
        d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z"
        fill="#8da4f1"
      />
    </g>
  </svg>
);
