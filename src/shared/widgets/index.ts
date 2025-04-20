export type CommonWidgetProps<T = void> = {
  className?: string;
  /**
   * Относительная ширина в сетке
   */
  w: number;
  /**
   * Относительная высота в сетке
   */
  h: number;
} & T;
