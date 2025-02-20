export const glossaryData = [
  {
    term: "Artificial General Intelligence (AGI)",
    definition:
      "A hypothetical intelligence of a machine capable of understanding, learning, and applying knowledge across a wide range of tasks, similar to a human being."
  },
  {
    term: "Artificial Neural Network (ANN)",
    definition:
      "A computing system inspired by biological neural networks. ANNs learn by example, without explicit programming for specific tasks."
  },
  {
    term: "Backpropagation",
    definition:
      "A method in ANNs to calculate gradients for weight adjustments, fine-tuning the network based on error rates.",
    longDefinition: `
## Backpropagation: A Deeper Dive

Backpropagation, short for "backward propagation of errors," is a fundamental algorithm for training artificial neural networks. It works by computing the gradient of the loss function with respect to each weight by the chain rule, iteratively adjusting the weights to minimize the error.

Here's an example of a gradient calculation in JavaScript:

\`\`\`js
// Calculate gradient for weight update
const gradient = computeGradient(errors, weights);
\`\`\`

And mathematically:
$$
\\nabla J(\\theta) = \\frac{\\partial J(\\theta)}{\\partial \\theta}
$$

This process is repeated across all layers until the network converges.
    `
  },
  {
    term: "Bias (in AI)",
    definition:
      "Systematic errors in data or algorithms causing skewed results, often reflecting underlying societal biases.",
    longDefinition: `
## Bias in AI

Bias in artificial intelligence can manifest in many ways:

- **Data Bias**: When the data fed into the system has inherent biases.
- **Algorithmic Bias**: When the algorithms themselves introduce bias during processing.

> "The measure of intelligence is the ability to change."  
> — Albert Einstein

Understanding and mitigating bias is crucial for fair AI systems.
    `
  },
  {
    term: "Chatbot",
    definition:
      "A computer program simulating conversation with human users, often leveraging natural language processing (NLP) techniques."
  },
  {
    term: "Supervised Learning",
    definition:
      "A machine learning paradigm where models are trained on labeled data, learning the mapping between inputs and outputs."
  },
  {
    term: "Unsupervised Learning",
    definition:
      "A machine learning paradigm where models identify patterns or clusters in unlabeled data without predefined outcomes."
  },
  {
    term: "Reinforcement Learning",
    definition:
      "A learning paradigm where an agent learns to make decisions by taking actions in an environment to maximize cumulative reward."
  },
  {
    term: "Self-Supervised Learning",
    definition:
      "A form of learning where the model generates labels from the data itself, reducing dependency on annotated datasets."
  },
  {
    term: "Few-Shot Learning",
    definition:
      "Techniques enabling models to learn from a very limited amount of data for new tasks."
  },
  {
    term: "Zero-Shot Learning",
    definition:
      "Methods allowing models to generalize to tasks with no specific training examples, often using semantic relationships."
  },
  {
    term: "Transfer Learning",
    definition:
      "A technique where knowledge from one domain is applied to improve learning in another, often related, domain."
  },
  {
    term: "Convolutional Neural Network (CNN)",
    definition:
      "A deep learning architecture primarily used for processing grid-like data such as images, featuring convolutional layers to capture spatial hierarchies."
  },
  {
    term: "Recurrent Neural Network (RNN)",
    definition:
      "A class of neural networks designed for sequential data that maintains a hidden state to capture time-dependent information."
  },
  {
    term: "Long Short-Term Memory (LSTM)",
    definition:
      "A type of RNN that mitigates the vanishing gradient problem, using gates to control information flow over time."
  },
  {
    term: "Transformers",
    definition:
      "A neural network architecture that relies on self-attention mechanisms to process sequential data in parallel, revolutionizing NLP."
  },
  {
    term: "Self-Attention Mechanism",
    definition:
      "A technique where a model weighs the significance of different parts of the input data, enabling it to capture long-range dependencies."
  },
  {
    term: "Generative Adversarial Networks (GANs)",
    definition:
      "A class of models consisting of two networks—the generator and discriminator—that compete to produce realistic synthetic data."
  },
  {
    term: "Diffusion Models",
    definition:
      "Generative models that iteratively refine noise to generate data, recently popularized for high-quality image synthesis."
  },
  {
    term: "Stochastic Gradient Descent (SGD)",
    definition:
      "An optimization algorithm that updates model parameters using a random subset of data at each iteration, balancing speed and convergence."
  },
  {
    term: "Adam Optimizer",
    definition:
      "An adaptive optimization algorithm combining the benefits of momentum and RMSProp, widely used in training deep networks."
  },
  {
    term: "Cross-Entropy Loss",
    definition:
      "A loss function commonly used in classification tasks that measures the difference between predicted and actual probability distributions."
  },
  {
    term: "Dropout",
    definition:
      "A regularization technique that randomly deactivates neurons during training to prevent overfitting."
  },
  {
    term: "Regularization",
    definition:
      "Techniques that constrain model complexity to enhance generalization, including methods like L1/L2 regularization and dropout."
  },
  {
    term: "Overfitting",
    definition:
      "A scenario where a model learns the training data too well, including noise and outliers, and performs poorly on unseen data."
  },
  {
    term: "Underfitting",
    definition:
      "When a model is too simple to capture the underlying patterns in the data, leading to poor performance on both training and unseen data."
  },
  {
    term: "Data Augmentation",
    definition:
      "The process of artificially expanding a dataset using transformations to improve model robustness and prevent overfitting."
  },
  {
    term: "Hyperparameter Tuning",
    definition:
      "The process of optimizing parameters that govern the training process (e.g., learning rate, batch size) to improve model performance."
  },
  {
    term: "Residual Networks (ResNets)",
    definition:
      "Deep networks using skip connections to allow gradients to flow through many layers, facilitating the training of very deep architectures."
  },
  {
    term: "Neural Architecture Search (NAS)",
    definition:
      "Automated techniques for designing optimal neural network architectures, often leveraging evolutionary or reinforcement learning methods."
  },
  {
    term: "Autoencoders",
    definition:
      "Neural networks that learn to compress data into a lower-dimensional space and then reconstruct it, useful for representation learning."
  },
  {
    term: "Variational Autoencoders (VAEs)",
    definition:
      "A probabilistic extension of autoencoders that imposes a distribution over the latent space, enabling generative modeling."
  },
  {
    term: "Batch Normalization",
    definition:
      "A technique to standardize inputs of each layer in a neural network, stabilizing and accelerating training."
  },
  {
    term: "Gradient Clipping",
    definition:
      "A method to prevent exploding gradients by capping the magnitude of gradients during backpropagation."
  },
  {
    term: "Monte Carlo Methods",
    definition:
      "A broad class of algorithms that rely on repeated random sampling to compute numerical estimates, used in optimization and simulation."
  },
  {
    term: "Markov Decision Processes",
    definition:
      "A mathematical framework for modeling decision-making where outcomes are partly random and partly under the control of a decision maker."
  },
  {
    term: "Deep Reinforcement Learning",
    definition:
      "The integration of deep learning with reinforcement learning, enabling agents to learn complex policies from high-dimensional inputs."
  },
  {
    term: "Q-Learning",
    definition:
      "A model-free reinforcement learning algorithm that seeks to learn the value of actions in given states to maximize rewards."
  },
  {
    term: "Deep Q Networks (DQN)",
    definition:
      "A deep learning-based extension of Q-Learning that uses neural networks to approximate the Q-value function."
  },
  {
    term: "Actor-Critic Methods",
    definition:
      "Reinforcement learning algorithms that simultaneously learn a policy (actor) and a value function (critic) to optimize decision making."
  },
  {
    term: "Proximal Policy Optimization (PPO)",
    definition:
      "A state-of-the-art policy gradient method in reinforcement learning that balances exploration and exploitation with stable updates."
  },
  {
    term: "Trust Region Policy Optimization (TRPO)",
    definition:
      "An advanced reinforcement learning algorithm that ensures updates remain within a safe region to improve stability during learning."
  },
  {
    term: "Self-Supervised Learning",
    definition:
      "A learning strategy where the system uses part of the input data to predict another part, thereby generating its own supervisory signal."
  },
  {
    term: "Few-Shot Learning",
    definition:
      "Techniques that allow a model to generalize from very few examples, often using prior knowledge or transfer learning."
  },
  {
    term: "Zero-Shot Learning",
    definition:
      "An approach that enables models to perform tasks they were not explicitly trained for, leveraging semantic information or related concepts."
  },
  {
    term: "Federated Learning",
    definition:
      "A decentralized learning approach where multiple devices collaboratively train a model while keeping data local for privacy."
  },
  {
    term: "Meta-Learning",
    definition:
      "Also known as 'learning to learn,' it focuses on designing models that can adapt quickly to new tasks with minimal data."
  },
  {
    term: "Ensembling",
    definition:
      "Combining multiple models to improve overall performance, robustness, and generalization through techniques like bagging and boosting."
  },
  {
    term: "Bagging",
    definition:
      "An ensemble technique where multiple models are trained independently on different subsets of data and their predictions are aggregated."
  },
  {
    term: "Boosting",
    definition:
      "An ensemble method that combines weak learners sequentially, each correcting the errors of its predecessor to build a strong overall model."
  },
  {
    term: "Principal Component Analysis (PCA)",
    definition:
      "A dimensionality reduction technique that transforms data to a new coordinate system, highlighting the directions of maximum variance."
  }
];
