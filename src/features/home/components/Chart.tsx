const Chart = () => {
  return (
    <iframe
      height="100%"
      width="100%"
      id="geckoterminal-embed"
      title="GeckoTerminal Embed"
      className="select-none rounded-[12px]"
      src="https://www.geckoterminal.com/pt/eth/pools/0xa43fe16908251ee70ef74718545e4fe6c5ccec9f?embed=1&info=0&swaps=0&grayscale=0&light_chart=0"
      allow="clipboard-write"
      allowFullScreen
    ></iframe>
  );
};

export default Chart;
