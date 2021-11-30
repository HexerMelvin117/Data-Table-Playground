import React from 'react';

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.375 16.406a.781.781 0 0 1 .781-.781h4.688a.781.781 0 1 1 0 1.563h-4.688a.781.781 0 0 1-.781-.782ZM6.25 11.72a.781.781 0 0 1 .781-.781H17.97a.781.781 0 1 1 0 1.562H7.03a.781.781 0 0 1-.781-.781ZM3.125 7.03a.781.781 0 0 1 .781-.781h17.188a.781.781 0 1 1 0 1.563H3.906a.781.781 0 0 1-.781-.782Z"
      fill="#000"
    />
  </svg>
);

export default FilterIcon;
