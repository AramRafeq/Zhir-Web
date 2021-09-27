/* eslint-disable no-param-reassign */
export default (componentRef) => {
  componentRef.clearFilters = () => componentRef.setState(
    { filteredInfo: null },
    componentRef.fetch,
  );
  componentRef.clearSorted = () => componentRef.setState({ sortedInfo: null }, componentRef.fetch);
  componentRef.clearAll = () => componentRef.setState(
    {
      sortedInfo: null,
      filteredInfo: null,
      customSearch: [],
    },
    () => {
      componentRef.fetch();
    },
  );
};
