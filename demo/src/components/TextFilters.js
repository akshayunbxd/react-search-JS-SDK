import React from 'react';

import { TextFacets } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const transform = function () {
    console.log(this);
    return this;
};

export const FacetItemComponent = ({ itemData, onClick }) => {
    const { name, count, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            className={`UNX-facet__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">{name}</div>
            <div className="-count">({count})</div>
        </div>
    );
};

const onFacetClick = (facetObj, eventType) => {
    console.log('Facet change :', facetObj, eventType);
    if (eventType === 'CLEAR') {
        scrollTop();
    }
    return true;
};

const TextFilters = () => {
    return (
        <TextFacets
            facetItemComponent={<FacetItemComponent />}
            collapsible
            enableViewMore
            searchable
            transform={transform}
            minViewMore={3}
            onFacetClick={onFacetClick}
        />
    );
};

export default TextFilters;
