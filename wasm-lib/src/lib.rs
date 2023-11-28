//! This lib is to add a few functions to call from React TS.
//! Source: https://www.tkat0.dev/posts/how-to-create-a-react-app-with-rust-and-wasm/

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
