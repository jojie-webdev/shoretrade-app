function autoScrollToTop(history: any, winRef: any) {
  history.listen(() => {
    // pre-scroll to top on url change
    winRef?.scrollIntoView?.();
  });
  winRef?.scrollIntoView?.();
}

export { autoScrollToTop };
