function autoScrollToTop(history: any) {
  const unlisten = history.listen(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
}

export { autoScrollToTop };
