interface ParametersType {
    title: string;
    subTitle?: string;
}

/* 각 화면의 타이틀 */
export function Title(parameters: ParametersType) {
    const title = parameters.title;
    const subTitle = parameters.subTitle;

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{subTitle}</p>
        </div>
    );
}