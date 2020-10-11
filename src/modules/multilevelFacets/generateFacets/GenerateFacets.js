import React from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List, Input } from '../../../components';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { multilevelFacets: props.multilevelFacets };
    }

    componentDidUpdate(prevProps) {
        const { multilevelFacets } = this.props;
        if (prevProps.multilevelFacets !== multilevelFacets) {
            const formattedMultilevelFacets = multilevelFacets.map(
                (bucketedFacet) => {
                    const matchBucketedFacet = this.state.multilevelFacets.find(
                        (bucketedFacetObj) => {
                            return (
                                bucketedFacetObj.facetDisplayName ===
                                bucketedFacet.facetDisplayName
                            );
                        }
                    );
                    return {
                        ...bucketedFacet,
                        isOpen: matchBucketedFacet
                            ? matchBucketedFacet.isOpen
                            : true,
                        filter: matchBucketedFacet
                            ? matchBucketedFacet.filter
                            : '',
                    };
                }
            );

            this.setState((currentState) => {
                return {
                    multilevelFacets: formattedMultilevelFacets,
                };
            });
        }
    }

    handleCollapseToggle = (event) => {
        const facetId = event.target.dataset['unx_name'];
        this.setState((currentState) => {
            const updatedTextFacets = currentState.multilevelFacets.map(
                (multilevelFacet) => {
                    if (facetId === multilevelFacet.facetDisplayName) {
                        return {
                            ...multilevelFacet,
                            isOpen: !multilevelFacet.isOpen,
                        };
                    }
                    return { ...multilevelFacet };
                }
            );

            return { ...currentState, multilevelFacets: updatedTextFacets };
        });
    };

    handleFilterChange = (event) => {
        const facetId = event.target.name;
        const value = event.target.value;
        this.setState((currentState) => {
            const updatedMultilevelFacets = currentState.multilevelFacets.map(
                (bucketedFacet) => {
                    if (facetId === bucketedFacet.facetDisplayName) {
                        return {
                            ...bucketedFacet,
                            filter: value.toLowerCase(),
                        };
                    }
                    return { ...bucketedFacet };
                }
            );

            return {
                ...currentState,
                multilevelFacets: updatedMultilevelFacets,
            };
        });
    };

    render() {
        const {
            onFacetClick,
            FacetItemComponent,
            label,
            collapsible,
            searchable,
        } = this.props;

        const { multilevelFacets } = this.state;

        if (multilevelFacets.length === 0) {
            return null;
        }

        return (
            <div className="UNX-bucketedFacet__container">
                {label ? label : null}
                {multilevelFacets.map((multilevelFacet) => {
                    const {
                        facetDisplayName,
                        multiLevelField,
                        values = [],
                        isOpen = true,
                        filter = '',
                    } = multilevelFacet;

                    let filteredValues = values;
                    if (filter.length > 0) {
                        filteredValues = values.filter((value) => {
                            return value.name.toLowerCase().includes(filter);
                        });
                    }

                    return (
                        <div
                            className={`UNX-facet__element ${
                                isOpen ? 'open' : ''
                            }`}
                            key={multiLevelField}
                        >
                            <div className="UNX-facet__header">
                                {facetDisplayName}

                                {collapsible && (
                                    <span
                                        className="-collapse-icon"
                                        data-unx_name={facetDisplayName}
                                        onClick={this.handleCollapseToggle}
                                    />
                                )}
                            </div>

                            {searchable && isOpen && (
                                <div className="UNX-facetFilter__container">
                                    <Input
                                        className="-input"
                                        value={filter}
                                        name={facetDisplayName}
                                        onChange={this.handleFilterChange}
                                        data-testid={'UNX_searchFacets'}
                                    />
                                </div>
                            )}
                            <List
                                items={filteredValues}
                                ListItem={FacetItemComponent || FacetItem}
                                idAttribute={'name'}
                                multiLevelField={multiLevelField}
                                onClick={onFacetClick}
                                className="UNX-facet__list"
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    multilevelFacets: PropTypes.array.isRequired,
    onFacetClick: PropTypes.func.isRequired,
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
};

export default GenerateFacets;
