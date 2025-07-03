# Max Pooling Visualization

An interactive educational tool to demonstrate max pooling operations in Convolutional Neural Networks (CNNs).

## Features

- **Interactive Visualization**: Move a pooling window across an input matrix to see how max pooling works
- **Multiple Pool Sizes**: Switch between 2×2 and 3×3 pooling windows
- **Real-time Calculations**: See the max value calculation for each pooling operation
- **Responsive Design**: Works on desktop and mobile devices
- **Educational Focus**: Clear step-by-step demonstration of the max pooling process

## How to Use

1. **Navigation**: Use the arrow buttons or keyboard arrow keys to move the pooling window
2. **Pool Size**: Select different pooling window sizes (2×2 or 3×3) from the dropdown
3. **Reset**: Clear the output and start over
4. **Random Data**: Generate new random input values

## What You'll Learn

- How max pooling reduces spatial dimensions
- The relationship between input size, pool size, and output size
- How max pooling preserves the most important features by taking maximum values
- Common pooling sizes used in CNNs (2×2 is most popular)

## Max Pooling in CNNs

Max pooling is a crucial operation in CNNs that:
- **Reduces computational load** by decreasing spatial dimensions
- **Provides translation invariance** by selecting dominant features
- **Prevents overfitting** by reducing the number of parameters
- **Maintains important features** while discarding less relevant information

### Common Pool Sizes

- **2×2 with stride 2**: Most common (80-90% of cases)
  - Reduces each spatial dimension by half
  - Standard in LeNet, AlexNet, VGGNet, etc.
- **3×3 with stride 2**: Occasionally used for more overlap
- **2×2 with stride 1**: Less common, creates overlapping pools

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies
- Responsive grid-based layout
- Smooth animations and transitions

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Interactive functionality and max pooling logic

## Educational Use

This tool is designed for:
- Computer Science students learning about CNNs
- Deep Learning course demonstrations
- Self-study of CNN architectures
- Visual understanding of pooling operations