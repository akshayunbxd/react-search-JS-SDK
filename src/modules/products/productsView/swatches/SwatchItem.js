import React from 'react';
import PropTypes from 'prop-types';

const SwatchItem = ({ itemData }) => {

    const { swatchImageUrl, swatchId, active } = itemData;
    return (<div
        className={`UNX-swatch-item-container ${active ? 'active' : ''}`}
        data-variant_id={swatchId}
    >
        <img
            data-variant_id={swatchId}
            src={swatchImageUrl} className='UNX-swatch-item image' />
    </div>)
}

SwatchItem.propTypes = {
    itemData: PropTypes.object.isRequired,
}

export default SwatchItem;
