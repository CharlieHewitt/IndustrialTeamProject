import React, { Component } from 'react'

export class EnterName extends Component {
    render() {
        return (
            <form>
                <input 
                    type="text" 
                    name="title" 
                    style={{
                        backgroundColor: '#ffffff',
                        width: '890px', 
                        height: '130px',
                        position: 'absolute',
                        fontSize: '70px',
                        left: '515px',
                        top:'393px'
                    }}
                    placeholder="Enter name..." 
                />
            </form>
        )
    }
}

export default EnterName