function autoScrollToTop(history: any, winRef: any) {
  const unlisten = history.listen(() => {
    if (winRef && winRef.current) {
      winRef.current.scrollIntoView(true);
    }
    // console.log(`ScrollToTop`)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
}

export { autoScrollToTop };
