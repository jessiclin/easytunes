import React, { Component } from 'react'
import SearchListCard from './SearchListCard.js'

class SearchList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchList: this.props.searchList
        }
    }

    render() {

        const items = this.state.searchList;
        

        return (
            <div className='section'>
                <div class='row'>
                    <div className='col s3'>Song</div>
                    <div className='col s3'>Artist</div>
                    <div className='col s3'>Length</div>
                    <div className='col s3'></div>
                </div>
                {items && items.map(function(item) {
                    console.log(item)
                    return (
                        <SearchListCard item={item}/>
                    );})
                }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const searchList = ownProps.searchList;
    return {

    };
}
export default SearchList;