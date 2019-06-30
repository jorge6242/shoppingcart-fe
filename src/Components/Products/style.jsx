const styles = theme => ({
  avatarContainer: {
    cursor: 'pointer',
  },
  avatar: {
    margin: "0 auto",
    width: 100,
    height: 100,
    textAlign: "center",
    marginBottom: '10px',
  },
  itemContainer: {
    margin: 5
  },
  ListTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  itemTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: '15px',
    marginTop: '5px',
    marginBottom: '10px',
  },
  fab: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  },
  productsContainer : {
    overflowY: 'auto',
    height: '500px',
  },
  categories: {
    textAlign: 'right',
  }
});

export default styles;
