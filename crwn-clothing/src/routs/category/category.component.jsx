import { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {CategoriesContext} from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-container-title">{category}</h2>
            <div className="category-container">  
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </>
    )

}

export default Category;