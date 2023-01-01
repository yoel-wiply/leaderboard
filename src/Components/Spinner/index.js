import React, { memo, useEffect, useState } from 'react';
import styles from './spinner.module.scss';



const Spinner = memo(() => {
  const [preloader,setPreloader] = useState("")
  // useEffect(()=> {
  //   if (typeof window !== "undefined") {
  //     const { sessionStorage} = window;
  //     setPreloader(sessionStorage.getItem("preloader"));
  //     }
  // })
  return (
  <div className={`${styles['fallback-spinner']} ${styles['app-loader']}`}>
    {/* {console.log(preloader, 'from preloader page')} */}
    {preloader !== "" &&  preloader === "null" && (
      <><div>
        <img
         className="fallback-logo"
         src="data:image/png;base64,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"
         alt="logo"
        /></div>
        <div className={`${styles['loading']}`}>
          <div className={`${styles['effect-1']} ${styles['effects']}`}></div>
          <div className={`${styles['effect-2']} ${styles['effects']}`}></div>
          <div className={`${styles['effect-3']} ${styles['effects']}`}></div>
        </div>
      </>
    )}
    {preloader !== "null" && preloader !== "undefined" && preloader !== "" && (
      <div>
      <img className={styles['fallback-logo']} src={preloader} alt="logo" />
      </div>
    )}
  </div>
)})

export default Spinner;
