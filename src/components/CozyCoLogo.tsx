import styled from "styled-components";

const SVG = styled.svg`
  max-width: 100%;
  height: auto;
`;

interface Props {
  width?: number;
}

export function CozyCoLogo({ width }: Props) {
  return (
    <SVG
      viewBox="0 0 392 80"
      width={width || undefined}
      height={width && Math.floor((width / 392) * 80)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>cozy co.</title>
      <path
        d="M36.0334 0C15.5204 0 0 15.8038 0 33.7875C0 47.6294 9.44247 56.1308 22.6836 56.1308C33.7541 56.1308 42.2198 50.5722 47.2124 40.218H46.5612C41.8942 45.9946 37.6614 48.3924 31.5834 48.3924C24.6373 48.3924 18.9935 43.7057 18.9935 33.4605C18.9935 18.8556 28.0018 1.85286 36.6846 1.85286C40.1577 1.85286 41.5686 4.46866 41.5686 8.17439C41.5686 13.188 38.9638 17.8747 34.4053 17.8747C33.6456 17.8747 32.5603 17.6567 31.909 17.2207C32.4517 21.4714 36.576 23.6512 40.3747 23.6512C46.8868 23.6512 52.2049 18.9646 52.2049 12.2071C52.2049 4.35967 45.0417 0 36.0334 0Z"
        fill="currentColor"
      />
      <path
        d="M52.1218 34.0054C52.2304 48.0654 62.7582 56.1308 76.542 56.1308C94.7758 56.1308 111.164 41.9618 111.164 22.1253C111.164 8.06539 100.637 0 86.8528 0C68.5105 0 52.1218 14.1689 52.1218 34.0054ZM93.1478 12.2071C93.0392 17.1117 91.8454 24.1962 89.5661 32.6975C86.2016 45.1226 81.5346 54.2779 76.1079 54.2779C71.658 54.2779 70.2471 49.8093 70.2471 43.9237C70.2471 38.9101 71.5495 31.9346 73.8287 23.4332C77.1932 10.8992 81.7517 1.85286 87.2869 1.85286C91.7368 1.85286 93.1478 6.32152 93.1478 12.2071Z"
        fill="currentColor"
      />
      <path
        d="M147.431 56.3488C157.959 56.3488 166.207 49.9183 167.618 32.8065H167.401C165.448 38.1471 159.695 39.346 154.811 39.346C143.524 39.346 136.252 34.0054 126.484 34.0054C125.073 34.0054 123.662 34.2234 122.36 34.5504C127.352 32.3706 133.973 30.7357 141.136 29.5368C157.416 26.594 173.262 22.5613 173.262 8.06539C173.262 3.70572 170.332 0.871934 166.642 0.871934C163.277 0.871934 160.672 2.72479 159.37 6.43052C164.905 5.44959 170.115 8.28337 170.115 12.752C170.115 15.2589 168.487 16.4578 166.424 16.4578C156.114 16.4578 152.315 0 138.965 0C128.872 0 122.468 7.73842 118.018 24.1962H118.235C120.949 18.6376 126.701 17.6567 131.151 17.6567C142.221 17.6567 148.733 22.6703 158.284 22.6703C159.37 22.6703 160.672 22.4523 161.975 21.9074C156.331 24.5232 148.408 26.485 139.942 27.7929C120.514 30.8447 110.529 36.6213 110.529 47.8474C110.529 53.079 113.894 56.1308 118.018 56.1308C121.708 56.1308 124.53 54.0599 125.724 50.3542C119.972 51.4441 113.351 49.9183 113.351 44.5777C113.351 41.6349 115.413 40 118.018 40C129.089 40 133.43 56.3488 147.431 56.3488Z"
        fill="currentColor"
      />
      <path
        d="M238.013 1.08991H218.911L212.29 27.9019C209.36 39.891 203.282 45.2316 198.072 45.2316C195.25 45.2316 194.274 43.4877 194.274 40.9809C194.274 39.782 194.382 38.5831 194.708 37.2752L203.716 1.08991H178.645V1.3079C181.358 3.26975 182.66 4.68665 182.66 7.41144C182.66 8.71934 182.335 10.3542 181.684 12.861L175.931 36.2943C175.497 38.0382 175.172 39.782 175.172 41.4169C175.172 48.7193 179.622 54.7139 188.63 54.7139C199.158 54.7139 205.236 47.1935 209.903 37.3842L206.864 50.0272C202.305 68.8828 197.964 78.1471 189.498 78.1471C184.397 78.1471 181.684 74.4414 181.684 69.6458C181.684 65.0681 184.397 62.1253 187.87 61.6894C185.591 59.0736 182.335 57.3297 177.776 57.3297C171.916 57.3297 167.14 61.0354 167.14 66.485C167.14 75.4223 177.885 80 189.498 80C210.228 80 221.299 66.921 227.485 42.6158L238.013 1.08991Z"
        fill="currentColor"
      />
      <path
        d="M294.629 0C274.116 0 258.595 15.8038 258.595 33.7875C258.595 47.6294 268.038 56.1308 281.279 56.1308C292.35 56.1308 300.815 50.5722 305.808 40.218H305.157C300.49 45.9946 296.257 48.3924 290.179 48.3924C283.233 48.3924 277.589 43.7057 277.589 33.4605C277.589 18.8556 286.597 1.85286 295.28 1.85286C298.753 1.85286 300.164 4.46866 300.164 8.17439C300.164 13.188 297.559 17.8747 293.001 17.8747C292.241 17.8747 291.156 17.6567 290.504 17.2207C291.047 21.4714 295.171 23.6512 298.97 23.6512C305.482 23.6512 310.8 18.9646 310.8 12.2071C310.8 4.35967 303.637 0 294.629 0Z"
        fill="currentColor"
      />
      <path
        d="M310.717 34.0054C310.826 48.0654 321.354 56.1308 335.137 56.1308C353.371 56.1308 369.76 41.9618 369.76 22.1253C369.76 8.06539 359.232 0 345.448 0C327.106 0 310.717 14.1689 310.717 34.0054ZM351.743 12.2071C351.635 17.1117 350.441 24.1962 348.162 32.6975C344.797 45.1226 340.13 54.2779 334.703 54.2779C330.253 54.2779 328.842 49.8093 328.842 43.9237C328.842 38.9101 330.145 31.9346 332.424 23.4332C335.789 10.8992 340.347 1.85286 345.882 1.85286C350.332 1.85286 351.743 6.32152 351.743 12.2071Z"
        fill="currentColor"
      />
      <path
        d="M392 44.9046C392 38.8011 387.333 33.8965 381.147 33.8965C374.96 33.8965 370.293 38.8011 370.293 44.9046C370.293 51.0082 374.96 55.9128 381.147 55.9128C387.333 55.9128 392 51.0082 392 44.9046Z"
        fill="currentColor"
      />
    </SVG>
  );
}
