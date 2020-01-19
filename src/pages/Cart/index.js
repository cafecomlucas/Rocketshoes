import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
  MdShoppingBasket,
} from 'react-icons/md';
import {
  Container,
  ContainerNoProducts,
  ContainerTable,
  ProductTable,
  ProductLine,
  Total,
} from './styles';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

function Cart({
  cart,
  loadingProduct,
  removeFromCart,
  updateAmountRequest,
  total,
}) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      {cart.length <= 0 ? (
        <ContainerNoProducts>
          <MdShoppingBasket size={64} color="#333" />
          <h2>Ops!</h2>
          <h3>Carrinho sem produtos no momento.</h3>
          <Link to="/">Adicionar um produto</Link>
        </ContainerNoProducts>
      ) : (
        <>
          <ContainerTable>
            <ProductTable>
              <thead>
                <tr>
                  <th />
                  <th>PRODUTO</th>
                  <th>QTD</th>
                  <th>SUBTOTAL</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart.map(product => (
                  <ProductLine
                    key={product.id}
                    data-loading={loadingProduct[product.id]}
                  >
                    <td>
                      <img src={product.image} alt={product.title} />
                    </td>
                    <td>
                      <strong>{product.title}</strong>
                      <span>{product.formattedPrice}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          disabled={loadingProduct[product.id]}
                          type="button"
                          onClick={() => decrement(product)}
                        >
                          <MdRemoveCircleOutline size={20} color="#7159c1" />
                        </button>
                        <input type="number" disabled value={product.amount} />
                        <button
                          disabled={loadingProduct[product.id]}
                          type="button"
                          onClick={() => increment(product)}
                        >
                          <MdAddCircleOutline size={20} color="#7159c1" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <strong>{product.formattedSubTotal}</strong>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <MdDelete size={20} color="#7159c1" />
                      </button>
                    </td>
                  </ProductLine>
                ))}
              </tbody>
            </ProductTable>
          </ContainerTable>
          <footer>
            <button type="button">Finalizar pedido</button>
            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.products.map(product => ({
    ...product,
    formattedSubTotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.products.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
  loadingProduct: state.cart.loading.reduce((loading, item) => {
    loading[item.id] = item.status;
    return loading;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
