import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Categories, SortPopup, CoffeeBlock, CoffeeLoadingBlock} from '../components';

import {setCategory, setSortBy} from '../redux/actions/filters';
import {fetchCoffees} from '../redux/actions/coffees';
import {addCoffeeToCart} from '../redux/actions/cart';

const categoryNames = ['Арабика', 'Робуста', 'Либерика', 'Эксцельза'];
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавит', type: 'name', order: 'asc'},
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({coffees}) => coffees.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({coffees}) => coffees.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);

    React.useEffect(() => {
        dispatch(fetchCoffees(sortBy, category));
    }, [category, sortBy]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddCoffeeToCart = (obj) => {
        dispatch({
            type: 'ADD_COFFEE_CART',
            payload: obj,
        });
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <SortPopup
                    activeSortType={sortBy.type}
                    items={sortItems}
                    onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">Все кофейные зёрна</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                        <CoffeeBlock
                            onClickAddCoffee={handleAddCoffeeToCart}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}
                        />
                    ))
                    : Array(12)
                        .fill(0)
                        .map((_, index) => <CoffeeLoadingBlock key={index}/>)}
            </div>
        </div>
    );
}

export default Home;
