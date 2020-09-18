

/* 
  CSS modules are only used for component styling. 
  To use global CSS, change the code in global.css
*/

import styles from './layout.module.css' 

function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}

export default Layout