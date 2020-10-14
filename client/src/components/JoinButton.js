import React, { Component } from 'react'

export class Join extends Component {
    render() {
        return (
            <form>
                <input
                    type="submit"
                    value="Join Game"
                    className="btn"
                    style={{
                        position: 'absolute',
                        left: '968px',
                        top: '650px',
                        backgroundColor: '#ffffff',
                        height: '240px',
                        width: '440px',
                        display: 'inline-block',
                        fontSize: '70px',
                        textAlign: 'center',
                        color: '#0E1C42',
                        fontWeight: 'bold',
                        borderRadius: '60px'
                    }}
                />
            </form>
        )
    }
}

export default Join