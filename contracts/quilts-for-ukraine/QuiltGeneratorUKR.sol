//SPDX-License-Identifier: Unlicense
/// @title: Quilts for Ukraine
/// @author: Sam King (samking.eth)

/*
++++++ -  - - - - - - - - - - - - - - +++ - - - - - - - - - - - - - - - - ++++++
.                                                                              .
.                            We stand with Ukraine!                            .
.                                cozyco.studio                                 .
.                                                                              .
++++++ -  - - - - - - - - - - - - - - +++ - - - - - - - - - - - - - - - - ++++++
.                                                                              .
.                                                                              .
.           =##%%%%+    +%%%%%%+    +%%%%%%+    +%%%%%%+    +%%%%##=           .
.          :%%%%%%%%%%%+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*%%%%%%%%%%%%:          .
.        :#%%%%%%%%%%%+-%%%%%%%%%%%%%%+-%%%%%%%%%%%%%%+-%%%%%%%%%%%%%#.        .
.     -%%%%%%%%%%%%%%=--%%%%%%%%%%%%%=--%%%%%%%%%%%%%=--%%%%%%%%%%%%%+#%%-     .
.     %%%%%%%%%%%%%#=---%%%%%%%%%%%#=---%%%%%%%%%%%#=---%%%%%%%%%%%#=-%%%%     .
.     %%%%%%%%%%%%#-----%%%%%%%%%%#-----%%%%%%%%%%#-----%%%%%%%%%%#---%%%%     .
.     *%%%%%%%%%%*------%%%%%%%%%*------%%%%%%%%%*------%%%%%%%%%*----#%%*     .
.       %%%%%%%%*-------%%%%%%%%*-------%%%%%%%%*-------%%%%%%%%*-------       .
.       %%%%%%%+--------%%%%%%%+--------%%%%%%%+--------%%%%%%%+--------       .
.     *%%%%%%%+---------%%%%%%+---------%%%%%%+---------%%%%%%+-------*%%*     .
.     %%%%%%%=----------%%%%%=----------%%%%%=----------%%%%%=--------%%%%     .
.     %%%%%#=-----------%%%#=-----------%%%#=-----------%%%#=---------%%%%     .
.     %%%%#-------------%%#-------------%%#-------------%%#-----------%%%%     .
.     *%%*--------------%*--------------%*--------------%*------------*%%*     .
.       *---------------*---------------*---------------*---------------       .
.                                                                              .
.     *%%*                                                            *%%*     .
.     %%%%                                                            %%%%     .
.     %%%%                                                            %%%%     .
.     %%%%                                                            %%%%     .
.     *%%*           -+**+-                          -+**+-           *%%*     .
.                   *%%%%%%*                        *%%%%%%*                   .
.                   *%%%%%%*                        *%%%%%%*                   .
.     *%%*           -+**+-                          -+**+-           *%%*     .
.     %%%%                                                            %%%%     .
.     %%%%                                                            %%%%     .
.     -%%*                                                            *%%-     .
.                                                                              .
.           *%%%%%%+    +%%%%%%+    +%%%%%%+    +%%%%%%+    +%%%%%%*           .
.           =##%%%%+    +%%%%%%+    +%%%%%%+    +%%%%%%+    +%%%%##=           .
.                                                                              .
.                                                                              .
++++++ -  - - - - - - - - - - - - - - +++ - - - - - - - - - - - - - - - - ++++++
*/

pragma solidity ^0.8.10;

import "../utils/Strings.sol";
import "../utils/Base64.sol";

interface IQuiltGeneratorUKR {
    struct Quilt {
        uint256[5][5] patches;
        uint256 quiltW;
        uint256 quiltH;
        uint256 totalPatchesAbsW;
        uint256 totalPatchesAbsH;
        uint256 quiltAbsW;
        uint256 quiltAbsH;
        uint256 roundness;
        uint256 themeIndex;
        uint256 backgroundIndex;
        uint256 backgroundThemeIndex;
        uint256 calmnessFactor;
        bool hovers;
        bool animatedBg;
    }

    function generateQuilt(uint256 seed) external view returns (Quilt memory);

    function quiltImageSVGString(Quilt memory quilt, uint256 seed)
        external
        view
        returns (string memory svg);

    function quiltMetadata(uint256 tokenId, uint256 seed)
        external
        view
        returns (string memory metadata);
}

contract QuiltGeneratorUKR is IQuiltGeneratorUKR {
    string[5][3] private colors = [
        ["0A335C", "0066FF", "66B3FF", "CCE6FF", "Azure"],
        ["413609", "FFCC00", "FFE066", "FFF5CC", "Gold"],
        ["0A335C", "0066FF", "FFCC00", "FFF5CC", "Azure Gold"]
    ];

    string[18] private patches = [
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M0 0h64v32H0z"/><path fill="url(#c2)" d="M0 32 16 0v32H0Zm16 0L32 0v32H16Zm16 0L48 0v32H32Zm16 0L64 0v32H48Z"/><circle cx="16" cy="48" r="4" fill="url(#c1)"/><circle cx="48" cy="48" r="4" fill="url(#c1)"/>',
        '<path fill="url(#c2)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M32 0h32v64H32z"/><path fill="url(#c3)" d="M0 64 64 0v64H0Z"/><circle cx="46" cy="46" r="10" fill="url(#c2)"/>',
        '<path fill="url(#c2)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="m52 16 8-16h16l-8 16v16l8 16v16H60V48l-8-16V16Zm-64 0 8-16h16L4 16v16l8 16v16H-4V48l-8-16V16Z"/><path fill="url(#c3)" d="m4 16 8-16h16l-8 16v16l8 16v16H12V48L4 32V16Zm32 0 8-16h16l-8 16v16l8 16v16H44V48l-8-16V16Z"/>',
        '<path fill="url(#c1)" d="M0 0h64v64H0z"/><path fill="url(#c3)" d="M0 60h64v8H0zm0-16h64v8H0zm0-16h64v8H0zm0-16h64v8H0zM0-4h64v8H0z"/>',
        '<path fill="url(#c1)" d="M0 0h64v64H0z"/><path fill="url(#c3)" d="M16 0H8L0 8v8L16 0Zm16 0h-8L0 24v8L32 0Zm16 0h-8L0 40v8L48 0Zm16 0h-8L0 56v8L64 0Zm0 16V8L8 64h8l48-48Zm0 16v-8L24 64h8l32-32Zm0 16v-8L40 64h8l16-16Zm0 16v-8l-8 8h8Z"/>',
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M0 64 32 0v64H0Zm32 0L64 0v64H32Z"/>',
        '<path fill="url(#c1)" d="M0 0h64v64H0z"/><path fill="url(#c3)" d="M0 64 64 0v64H0Z"/>',
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M0 16V0h64L48 16V0L32 16V0L16 16V0L0 16Z"/><path fill="url(#c2)" d="M0 48V32h64L48 48V32L32 48V32L16 48V32L0 48Z"/>',
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M0 0h48v48H0z"/><path fill="url(#c2)" d="M0 48 48 0v48H0Z"/><circle cx="23" cy="25" r="8" fill="url(#c3)"/>',
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M0 0h32v32H0zm32 32h32v32H32z"/>',
        '<path fill="url(#c1)" d="M0 0h64v64H0z"/><path fill="url(#c3)" d="M16 0 0 16v16l16-16 16 16 16-16 16 16V16L48 0 32 16 16 0Zm0 32L0 48v16l16-16 16 16 16-16 16 16V48L48 32 32 48 16 32Z"/>',
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="M8 8h40v8H8z"/><path fill="url(#c2)" d="M24 32h8v8h-8zm8-8h8v8h-8z"/><path fill="url(#c1)" d="M24 24h8v8h-8zm8 8h8v8h-8zM16 48h40v8H16z"/><path fill="url(#c2)" d="M8 16h8v40H8zm40-8h8v40h-8z"/>',
        '<path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c1)" d="m24 4 8 8-8 8V4Zm0 40 8 8-8 8V44Zm-4-20-8 8-8-8h16Zm40 0-8 8-8-8h16ZM40 4l-8 8 8 8V4Zm0 40-8 8 8 8V44Zm-20-4-8-8-8 8h16Zm40 0-8-8-8 8h16Z"/><path fill="url(#c2)" d="M24 24h16v16H24z"/>',
        '<path fill="url(#c1)" d="M0 0h64v64H0z"/><path fill="url(#c2)" d="m32 0 16 16-16 16V0Zm0 64L16 48l16-16v32ZM48 0l16 16-16 16V0ZM16 64 .0000014 48 16 32v32Z"/><path fill="url(#c3)" d="M0 16 16 2e-7 32 16H0Zm64 32L48 64 32 48h32ZM32 32 16 16 0 32h32Zm0 0 16 16 16-16H32Z"/>',
        '<path fill="url(#c2)" d="M0 0h64v64H0z"/><path fill="url(#c3)" d="M0 0h64v64H0z"/><path fill="url(#c2)" d="M32 32-.0000014.0000019 32 5e-7V32Zm0 0 32 32H32V32Z"/><path fill="url(#c1)" d="M32 32-.00000381 64l.0000028-32H32Zm0 0L64 0v32H32Z"/>',
        '<path d="M0 0h64v64H0z" fill="url(#c1)"/><path d="M32.5 6c-1.2039 1.40139-1.9375 3.23582-1.9375 5.2493.0713 4.4209.5999 8.8329.6458 13.2526.0956 4.119-1.1088 7.9877-2.5732 11.7616-.488 1.0429-1.0158 2.0637-1.544 3.0854l-1.554-.321c-1.3983-.2868-2.3079-1.6817-2.0283-3.1164.2446-1.2553 1.3215-2.1271 2.5228-2.1328l.5651.0621-1.2614-10.8091c-.4123-4.8134-2.8327-9.0355-6.3978-11.7824-.6127-.4721-1.2618-.9036-1.9375-1.28386V48.3565h8.638c.6459 3.5974 2.5755 6.7313 5.2878 8.8834.6451.4562 1.1855 1.0579 1.5742 1.7601.3887-.7022.9291-1.3039 1.5742-1.7601 2.7123-2.1521 4.6419-5.286 5.2878-8.8834H48V9.96544c-.6757.38026-1.3248.81176-1.9375 1.28386-3.5651 2.7469-5.9855 6.969-6.3978 11.7824l-1.2614 10.8091.5651-.0621c1.2013.0058 2.2782.8775 2.5228 2.1328.2796 1.4347-.63 2.8296-2.0283 3.1164l-1.554.321c-.5282-1.0217-1.056-2.0425-1.544-3.0854-1.4644-3.7739-2.6688-7.6426-2.5732-11.7616.0459-4.4197.5745-8.8317.6458-13.2526 0-2.01348-.7336-3.84791-1.9375-5.2493Zm-12.9167 9.4943c1.6718 2.013 2.7938 4.5215 3.1283 7.2785l1.0394 8.9145c-1.3235.676-2.3269 1.9162-2.7045 3.4166h-1.4632V15.4943Zm25.8334 0v19.6096h-1.4632c-.3776-1.5004-1.381-2.7406-2.7045-3.4166l1.0394-8.9145c.3345-2.757 1.4565-5.2655 3.1283-7.2785ZM32.5 33.4163c.6939 2.3287 1.6487 4.54 2.8356 6.5952-1.129.3519-2.1116 1.0364-2.8356 1.9568-.724-.9204-1.7066-1.6049-2.8356-1.9568 1.1869-2.0552 2.1417-4.2665 2.8356-6.5952Zm-12.9167 4.3381h1.4632c.4614 1.8292 1.8533 3.2745 3.6228 3.7791l1.2412.2899c-.3324 1.2362-.5147 2.5386-.5147 3.8826h-5.8125v-7.9516Zm24.3702 0h1.4632v7.9516h-5.8125c0-1.344-.1823-2.6464-.5147-3.8826l1.2412-.2899c1.7695-.5046 3.1614-1.9499 3.6228-3.7791Zm-15.5202 4.6799c1.5671.2272 2.775 1.6014 2.775 3.2717h-3.2291c0-1.1362.164-2.2311.4541-3.2717Zm8.1334 0c.2901 1.0406.4541 2.1355.4541 3.2717h-3.2291c0-1.6703 1.2079-3.0445 2.775-3.2717Zm-8.2949 5.9222h2.9365v5.5806c-1.4251-1.5286-2.4603-3.448-2.9365-5.5806Zm5.5199 0h2.9365c-.4762 2.1326-1.5114 4.052-2.9365 5.5806v-5.5806Z" fill="url(#c3)"/>',
        '<path d="M0 0h64v64H0z" fill="url(#c2)"/><path fill="url(#c1)" d="M9 50v14h46V50h-2v-6h-2v-6h-2v-4h-2v-2h-4v2h-2v4H23v-4h-2v-2h-4v2h-2v4h-2v6h-2v6H9Z"/><path fill="url(#c3)" d="M11 50v14h42V50h-2v-6h-2v-6h-2v-4h-4v4h-2v2H23v-2h-2v-4h-4v4h-2v6h-2v6h-2Z"/><path fill="url(#c2)" d="M23 44v-4h4v4h-4Zm6 0v-4h6v4h-6Zm8 0v-4h4v4h-4ZM13 54h-2v8h2v-8Zm38 8v-8h2v8h-2Z"/><path fill="url(#c1)" d="M15 48v-2h2v2h2v2h-2v2h-2v-2h2v-2h-2Zm6 2v-4h4v4h-4Zm8 2v-2h2v-2h2v2h2v2h-6Zm10-2v-4h4v4h-4Zm8-4h2v2h-2v2h2v2h-2v-2h-2v-2h2v-2Z"/>',
        '<path d="M0 0h64v64H0z" fill="url(#c1)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M29 51.7765V37.0142L18.9007 47.1136C21.6957 49.5382 25.17 51.2004 29 51.7765Zm-14.0046-9.243L29 28.5289V12.2235C19.3775 13.6709 12 21.9739 12 32c0 3.8653 1.0965 7.4745 2.9954 10.5335Zm30.1114 4.5735C42.3105 49.5352 38.8334 51.1999 35 51.7765V37.0002L45.1068 47.107Zm3.9031-4.5822L35 28.5149V12.2235C44.6225 13.671 52 21.9739 52 32c0 3.8617-1.0944 7.4677-2.9901 10.5248ZM58 32c0 14.3594-11.6406 26-26 26S6 46.3594 6 32 17.6406 6 32 6s26 11.6406 26 26Z" fill="url(#c3)"/>'
    ];

    string[3][4] private backgrounds = [
        [
            '<pattern id="bp" width="64" height="64" patternUnits="userSpaceOnUse"><circle cx="32" cy="32" r="8" fill="transparent" stroke="url(#c1)" stroke-width="1" opacity=".6"/></pattern><filter id="bf"><feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="1" seed="',
            '"/><feDisplacementMap in="SourceGraphic" xChannelSelector="B" scale="200"/></filter><g filter="url(#bf)"><rect x="-50%" y="-50%" width="200%" height="200%" fill="url(#bp)">',
            "0,64"
        ],
        [
            '<pattern id="bp" width="128" height="128" patternUnits="userSpaceOnUse"><path d="m64 16 32 32H64V16ZM128 16l32 32h-32V16ZM0 16l32 32H0V16ZM128 76l-32 32h32V76ZM64 76l-32 32h32V76Z" fill="url(#c2)"/></pattern><filter id="bf"><feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="1" seed="',
            '"/><feDisplacementMap in="SourceGraphic" scale="100"/></filter><g filter="url(#bf)"><rect x="-50%" y="-50%" width="200%" height="200%" fill="url(#bp)" opacity=".2">',
            "0,128"
        ],
        [
            '<pattern id="bp" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M32 0L0 32V64L32 32L64 64V32L32 0Z" fill="url(#c1)" opacity=".1"/></pattern><filter id="bf"><feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="1" seed="',
            '"/><feDisplacementMap in="SourceGraphic" scale="200"/></filter><g filter="url(#bf)"><rect x="-50%" y="-50%" width="200%" height="200%" fill="url(#bp)">',
            "-128,0"
        ],
        [
            '<pattern id="bp" width="80" height="40" patternUnits="userSpaceOnUse"><path d="M0 20a20 20 0 1 1 0 1M40 0a20 20 0 1 0 40 0m0 40a20 20 0 1 0 -40 0" fill="url(#c2)" opacity=".2"/></pattern><filter id="bf"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" seed="',
            '"/><feDisplacementMap in="SourceGraphic" scale="200"/></filter><g filter="url(#bf)"><rect x="-50%" y="-50%" width="200%" height="200%" fill="url(#bp)">',
            "0,-80"
        ]
    ];

    struct RandValues {
        uint256 x;
        uint256 y;
        uint256 roundness;
        uint256 theme;
        uint256 bg;
        uint256 cf;
        uint256 ppX;
        uint256 ppY;
    }

    function generateQuilt(uint256 seed) public view returns (Quilt memory) {
        string memory seedStr = Strings.toString(seed);
        Quilt memory quilt;
        RandValues memory rand;

        // Determine how big the quilt is
        rand.x = random(seedStr, "X") % 100;
        rand.y = random(seedStr, "Y") % 100;

        if (rand.x < 1) {
            quilt.quiltW = 1;
        } else if (rand.x < 10) {
            quilt.quiltW = 2;
        } else if (rand.x < 60) {
            quilt.quiltW = 3;
        } else if (rand.x < 90) {
            quilt.quiltW = 4;
        } else {
            quilt.quiltW = 5;
        }

        if (quilt.quiltW == 1) {
            quilt.quiltH = 1;
        } else if (rand.y < 10) {
            quilt.quiltH = 2;
        } else if (rand.y < 60) {
            quilt.quiltH = 3;
        } else if (rand.y < 90) {
            quilt.quiltH = 4;
        } else {
            quilt.quiltH = 5;
        }

        if (quilt.quiltW == 2 && quilt.quiltH == 5) {
            quilt.quiltW = 3;
        }
        if (quilt.quiltH == 2 && quilt.quiltW == 5) {
            quilt.quiltH = 3;
        }

        quilt.totalPatchesAbsW = 64 * quilt.quiltW + (quilt.quiltW - 1) * 4;
        quilt.totalPatchesAbsH = 64 * quilt.quiltH + (quilt.quiltH - 1) * 4;
        quilt.quiltAbsW = quilt.totalPatchesAbsW + 32;
        quilt.quiltAbsH = quilt.totalPatchesAbsH + 32;

        // Patch selection
        rand.ppX = random(seedStr, "PPX") % quilt.quiltW;
        rand.ppY = random(seedStr, "PPY") % quilt.quiltH;
        for (uint256 col = 0; col < quilt.quiltW; col++) {
            for (uint256 row = 0; row < quilt.quiltH; row++) {
                quilt.patches[col][row] =
                    random(seedStr, string(abi.encodePacked("P", col, row))) %
                    16;
                quilt.patches[rand.ppX][rand.ppY] = 17;
            }
        }

        // Patch roundness
        rand.roundness = random(seedStr, "R") % 100;
        if (rand.roundness < 70) {
            quilt.roundness = 8;
            // } else if (rand.roundness < 90) {
            quilt.roundness = 16;
        } else {
            quilt.roundness = 0;
        }

        // Color theme
        quilt.themeIndex = uint256(random(seedStr, "T") % colors.length);
        quilt.backgroundThemeIndex = random(seedStr, "SBGT") % 100 > 33
            ? uint256(random(seedStr, "SBGT") % colors.length)
            : quilt.themeIndex;

        // Background variant
        rand.bg = random(seedStr, "BG") % 100;
        if (rand.bg < 70) {
            quilt.backgroundIndex = 0;
        } else if (rand.bg < 80) {
            quilt.backgroundIndex = 1;
        } else if (rand.bg < 90) {
            quilt.backgroundIndex = 2;
        } else {
            quilt.backgroundIndex = 3;
        }

        // How calm or wavey a quilt is
        rand.cf = random(seedStr, "CF") % 100;
        if (rand.cf < 50) {
            quilt.calmnessFactor = 1;
        } else if (rand.cf < 70) {
            quilt.calmnessFactor = 2;
        } else if (rand.cf < 95) {
            quilt.calmnessFactor = 3;
        } else {
            quilt.calmnessFactor = 4;
        }

        // Animations
        quilt.hovers = random(seedStr, "H") % 100 > 90;
        quilt.animatedBg = random(seedStr, "ABG") % 100 > 70;

        return quilt;
    }

    function quiltImageSVGString(Quilt memory quilt, uint256 seed)
        public
        view
        returns (string memory svg)
    {
        // Build the SVG from various parts
        string[8] memory svgParts;

        for (uint256 col = 0; col < quilt.quiltW; col++) {
            for (uint256 row = 0; row < quilt.quiltH; row++) {
                uint256 x = (64 + 4) * col;
                uint256 y = (64 + 4) * row;
                uint256 patchPartIndex = quilt.patches[col][row];

                // Patch masks
                svgParts[0] = string(
                    abi.encodePacked(
                        svgParts[0],
                        '<mask id="s',
                        Strings.toString(col + 1),
                        Strings.toString(row + 1),
                        '"><rect rx="',
                        Strings.toString(quilt.roundness),
                        '" x="',
                        Strings.toString(x + 16),
                        '" y="',
                        Strings.toString(y + 16),
                        '" width="64" height="64" fill="white"/></mask>'
                    )
                );

                // Patches
                svgParts[6] = string(
                    abi.encodePacked(
                        svgParts[6],
                        '<g mask="url(#s',
                        Strings.toString(col + 1),
                        Strings.toString(row + 1),
                        ')"><g transform="translate(',
                        Strings.toString(x + 16),
                        " ",
                        Strings.toString(y + 16),
                        ')">',
                        patches[patchPartIndex],
                        "</g></g>"
                    )
                );

                // Patch stitches
                svgParts[7] = string(
                    abi.encodePacked(
                        svgParts[7],
                        '<rect rx="',
                        Strings.toString(quilt.roundness),
                        '" stroke-width="2" stroke-linecap="round" stroke="url(#c1)" stroke-dasharray="4 4" x="',
                        Strings.toString(x + 16),
                        '" y="',
                        Strings.toString(y + 16),
                        '" width="64" height="64" fill="transparent"/>'
                    )
                );
            }
        }

        // Color theme
        svgParts[1] = string(
            abi.encodePacked(
                '<linearGradient id="c1"><stop stop-color="#',
                colors[quilt.themeIndex][0],
                '"/></linearGradient><linearGradient id="c2"><stop stop-color="#',
                colors[quilt.themeIndex][1],
                '"/></linearGradient><linearGradient id="c3"><stop stop-color="#',
                colors[quilt.themeIndex][2],
                '"/></linearGradient><linearGradient id="c4"><stop stop-color="#',
                colors[quilt.backgroundThemeIndex][3],
                '"/></linearGradient>'
            )
        );

        // Background
        svgParts[2] = string(
            abi.encodePacked(
                backgrounds[quilt.backgroundIndex][0],
                Strings.toString(seed),
                backgrounds[quilt.backgroundIndex][1],
                quilt.animatedBg
                    ? string(
                        abi.encodePacked(
                            '<animateTransform attributeName="transform" type="translate" dur="4s" values="0,0; ',
                            backgrounds[quilt.backgroundIndex][2],
                            ';" repeatCount="indefinite"/>'
                        )
                    )
                    : "",
                "</rect></g>"
            )
        );

        // Quilt positioning
        unchecked {
            svgParts[3] = string(
                abi.encodePacked(
                    '<g transform="translate(',
                    Strings.toString((500 - quilt.quiltAbsW) / 2),
                    " ",
                    Strings.toString((500 - quilt.quiltAbsH) / 2),
                    ')">'
                )
            );
        }

        // Quilt shadow
        svgParts[4] = string(
            abi.encodePacked(
                '<rect x="8" y="8" width="',
                Strings.toString(quilt.quiltAbsW),
                '" height="',
                Strings.toString(quilt.quiltAbsH),
                '" rx="',
                Strings.toString(quilt.roundness == 0 ? 0 : quilt.roundness + 8),
                '" fill="url(#c1)"/>'
            )
        );

        // Quilt background
        svgParts[5] = string(
            abi.encodePacked(
                '<rect x="0" y="0" width="',
                Strings.toString(quilt.quiltAbsW),
                '" height="',
                Strings.toString(quilt.quiltAbsH),
                '" rx="',
                Strings.toString(quilt.roundness == 0 ? 0 : quilt.roundness + 8),
                '" fill="url(#c2)" stroke="url(#c1)" stroke-width="2"/>'
            )
        );

        svg = string(
            abi.encodePacked(
                '<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><defs>',
                svgParts[0], // Patch masks
                svgParts[1], // Color theme
                '</defs><rect width="500" height="500" fill="url(#c4)" />',
                svgParts[2], // Image background
                '<filter id="f" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence baseFrequency="',
                quilt.calmnessFactor * 3 >= 10 ? "0.0" : "0.00",
                Strings.toString(quilt.calmnessFactor * 3),
                '" seed="',
                seed,
                '"/><feDisplacementMap in="SourceGraphic" scale="10"/></filter>',
                svgParts[3], // Quilt positioning
                '<g filter="url(#f)">'
            )
        );

        svg = string(
            abi.encodePacked(
                svg,
                svgParts[4], // Quilt shadow
                quilt.hovers
                    ? '<animateTransform attributeName="transform" type="scale" additive="sum" dur="4s" values="1 1; 1.005 1.02; 1 1;" calcMode="spline" keySplines="0.45, 0, 0.55, 1; 0.45, 0, 0.55, 1" repeatCount="indefinite"/>'
                    : "",
                '</g><g filter="url(#f)">',
                svgParts[5], // Quilt background
                svgParts[6], // Patches
                svgParts[7], // Patch stitches
                quilt.hovers
                    ? '<animateTransform attributeName="transform" type="translate" dur="4s" values="0,0; -4,-16; 0,0;" calcMode="spline" keySplines="0.45, 0, 0.55, 1; 0.45, 0, 0.55, 1" repeatCount="indefinite"/>'
                    : "",
                "</g></g></svg>"
            )
        );
    }

    function quiltMetadata(uint256 tokenId, uint256 seed)
        public
        view
        returns (string memory metadata)
    {
        Quilt memory quilt = generateQuilt(seed);
        string memory svg = quiltImageSVGString(quilt, seed);

        string[18] memory patchNames = [
            "Quilty",
            "Waterfront",
            "Flow",
            "Bengal",
            "Sunbeam",
            "Spires",
            "Division",
            "Crashing waves",
            "Equilibrium",
            "Ichimatsu",
            "Highlands",
            "Log cabin",
            "Maiz",
            "Flying geese",
            "Pinwheel",
            "Coat of arms",
            "Kawaii",
            "Peace"
        ];

        string[4] memory backgroundNames = ["Dusty", "Flags", "Electric", "Groovy"];

        string[4] memory calmnessNames = ["Serene", "Calm", "Wavey", "Chaotic"];

        // Make a list of the quilt patch names for metadata
        // Array `traits` are not supported by OpenSea, but other tools could
        // use this data for some interesting analysis.
        string memory patchNamesList;
        for (uint256 col = 0; col < quilt.quiltW; col++) {
            for (uint256 row = 0; row < quilt.quiltH; row++) {
                patchNamesList = string(
                    abi.encodePacked(
                        patchNamesList,
                        '"',
                        patchNames[quilt.patches[col][row]],
                        '"',
                        col == quilt.quiltW - 1 && row == quilt.quiltH - 1 ? "" : ","
                    )
                );
            }
        }

        // Build metadata attributes
        string memory attributes = string(
            abi.encodePacked(
                '[{"trait_type":"Background","value":"',
                backgroundNames[quilt.backgroundIndex],
                '"},{"trait_type":"Animated background","value":"',
                quilt.animatedBg ? "Yes" : "No",
                '"},{"trait_type":"Theme","value":"',
                colors[quilt.themeIndex][4],
                '"},{"trait_type":"Background theme","value":"',
                colors[quilt.backgroundThemeIndex][4],
                '"},{"trait_type":"Patches","value":[',
                patchNamesList,
                ']},{"trait_type":"Patch count","value":',
                Strings.toString(quilt.quiltW * quilt.quiltH)
            )
        );

        attributes = string(
            abi.encodePacked(
                attributes,
                '},{"trait_type":"Aspect ratio","value":"',
                Strings.toString(quilt.quiltW),
                ":",
                Strings.toString(quilt.quiltH),
                '"},{"trait_type":"Calmness","value":"',
                calmnessNames[quilt.calmnessFactor - 1],
                '"},{"trait_type":"Hovers","value":"',
                quilt.hovers ? "Yes" : "No",
                '"},{"trait_type":"Roundness","value":',
                Strings.toString(quilt.roundness),
                "}]"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"Quilt for Ukraine #',
                        Strings.toString(tokenId),
                        '","description":"Generative cozy quilts where all proceeds are donated to Ukraine.","attributes":',
                        attributes,
                        ',"image":"data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '"}'
                    )
                )
            )
        );

        metadata = string(abi.encodePacked("data:application/json;base64,", json));
    }

    function random(string memory seed, string memory key) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(key, seed)));
    }
}
