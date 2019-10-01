import React, { Component } from 'react'

import classes from './Layout.module.css'

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <section className={classes.header}>
                        <div></div>
                    </section>

                    <section>
                        <main>
                            <div>
                                {this.props.children}
                            </div>
                        </main>
                    </section>

                    <section>
                        <footer></footer>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default Layout