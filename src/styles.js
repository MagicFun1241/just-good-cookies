import JGC from './justgoodcookies';
import { addEnterAction, getMaxWidth, checkTailwindPrefix, returnLogo, returnIcon }  from "./utilities";
import { getCookie }  from "./cookies";
import { closeBannerWithButton, makeBannerAnimation, generateButtons }  from "./banner";
import { managePreferencesLink, managePreferencesLinkListener  }  from "./preferences";

/**
* Load banner layouts
*/
 export function loadBannerLayout(style){

  // "Yes" and "No" buttons
  const yesCookies    = JGC.customStyle?.accept ? JGC.customStyle.accept : checkTailwindPrefix('text-green-800 dark:text-green-300 bg-green-50 hover:bg-green-100 transition-all duration-300 dark:bg-green-900 ring-1 ring-green-200 px-2 py-0.5 text-xs uppercase font-bold items-center rounded my-2 border-none')
  const noCookies     = JGC.customStyle?.reject ? JGC.customStyle.reject : checkTailwindPrefix('text-red-800 dark:text-red-300 bg-red-50 hover:bg-red-100 transition-all duration-300 dark:bg-red-900 ring-red-200 ring-1 px-2 py-0.5 text-xs uppercase font-bold items-center rounded my-2 border-none')
  
  switch (style) {
    case "style1":
      JGC.positions =  {
        "top": checkTailwindPrefix("justify-top items-start top-0"),
        "center": checkTailwindPrefix("mx-auto top-1/2 -translate-y-1/2"),
        "bottom": checkTailwindPrefix("justify-end items-center bottom-0"),
      }   
      JGC.banner = document.createElement("div");
      JGC.banner.style.display = "none";
      JGC.banner.innerHTML = `<div id="bannerContent" style="${ JGC.bannerConfig.backgroundImage ? `background-size:cover; background-image:url(${ JGC.bannerConfig.backgroundImage })` : ''}" 
            class="
            ${ JGC.positions[JGC.bannerConfig.position || 'bottom'] } 
            ${ JGC.bannerConfig.backgroundColor } 
            ${ JGC.bannerConfig.backgroundImage ? `${ JGC.bannerConfig.backgroundColor } ${checkTailwindPrefix('p-2')}` : `${ JGC.bannerConfig.innerBackgroundImage ? '' : checkTailwindPrefix('p-6') }` }
            ${ getMaxWidth('max-w-sm') }
            ${checkTailwindPrefix('fixed shadow-[#979797] shadow-xl md:flex md:flex-col md:space-x-1 right-0 md:mr-[2%] transition duration-700 ease-in-out z-[99999] rounded')}">
            <div class="${checkTailwindPrefix('space-y-2 flex flex-col')} ${ JGC.bannerConfig.backgroundImage && !JGC.bannerConfig.innerBackgroundImage ? `${ JGC.bannerConfig.backgroundColor ?? '' }  ${checkTailwindPrefix('p-4')}`: ''}
              ${ JGC.bannerConfig.innerBackgroundImage && !JGC.bannerConfig.backgroundImage ? checkTailwindPrefix('pb-8') : ''} 
              ${ JGC.bannerConfig.innerBackgroundImage && JGC.bannerConfig.backgroundImage ? `${checkTailwindPrefix('pb-8')} ${ JGC.bannerConfig.backgroundColor ??  '' }` : ''}
              ">
              ${ JGC.bannerConfig.innerBackgroundImage ? `<img class="${ checkTailwindPrefix('md:rounded-t')}" src="${ JGC.bannerConfig.innerBackgroundImage }" />` : ''  }
              ${ returnLogo() }
              <div class="${checkTailwindPrefix('flex w-full')}" >
                  <div class="${checkTailwindPrefix('flex items-center space-x-1')} ${ JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefix('px-6') : ''}">
                    ${returnIcon()}
                    <h4 class="${ JGC.customStyle?.bannerTitle ?? checkTailwindPrefix('text-xl font-bold dark:text-white') }">${ JGC.bannerConfig.title }</h4>
                  </div>  
                  ${ JGC.bannerConfig.closeButton ? `<button id="jgc-close-button" class="${ JGC.bannerConfig.logo ? `${checkTailwindPrefix('absolute top-2 right-4')}`: `` }   ${JGC.customStyle?.closeButton ? `${JGC.customStyle.closeButton}` : `${checkTailwindPrefix('dark:text-white text-xl ml-auto m-0 p-0 bg-transparent')}`}">&times;</button>` : '' }
              </div>
              <div class="${ JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : checkTailwindPrefix('dark:text-white') } ${ JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefix('px-6') : ''}">
                <div>${ JGC.bannerText ? JGC.bannerText : `${ JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription }` }<br/></div>
                <div>${ JGC.bannerLink ? JGC.bannerLink : `${ JGC.locale.bannerLinkDescription } <a class="${ JGC.customStyle?.privacyLink ?? `${checkTailwindPrefix('dark:decoration-sky-500 dark:underline font-bold text-black dark:text-white')}` }" target="_blank" href="${ JGC.config.privacyLink }"> ${ JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel }</a>` }</div>
              </div>
              <div class="${checkTailwindPrefix('mt-2 flex flex-col')} ${ JGC.bannerConfig.innerBackgroundImage && checkTailwindPrefix('px-6') }">
                <div class="${checkTailwindPrefix('flex space-x-2')}">
                  <button role="button" tabindex="0" type="button" id="yesCookies" class="${ yesCookies }">${ JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText }</button>
                  ${ JGC.bannerConfig?.disableReject == false ? `<button role="button" tabindex="0" type="button" id="noCookies" class="${ noCookies }">${ JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText }</button>` : ''}
                </div>
                <div>${ managePreferencesLink() }</div>
              </div>
            </div>
      </div>`;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation()
      if(JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton())
      generateButtons()
      break;
    
    default:
        break;
  }
}